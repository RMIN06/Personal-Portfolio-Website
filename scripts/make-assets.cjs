const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const root = process.cwd();

async function texture() {
  const src = path.join(root, "public", "profile.png");
  const out = path.join(root, "public", "profile-card.webp");
  if (!fs.existsSync(src)) {
    console.log("SKIP texture: profile.png not found");
    return;
  }
  await sharp(src)
    .resize({ width: 450, withoutEnlargement: true })
    .rotate()
    .webp({ quality: 80 })
    .toFile(out);
  const kb = (fs.statSync(out).size / 1024).toFixed(1);
  console.log("OK profile-card.webp", kb, "KB");
}

function buildPdf(lines) {
  const content = lines.join("\n");
  const objects = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  objects.push(
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>"
  );
  const stream = `BT /F1 20 Tf 72 720 Td 14 TL (${lines
    .map(escapePdf)
    .join(") Tj T* (")}) Tj ET`;
  objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((o, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((off) => {
    pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, "latin1");
}

function escapePdf(s) {
  return s.replace(/[()\\]/g, (m) => "\\" + m).replace(/\r?\n/g, "");
}

function cv() {
  const out = path.join(root, "public", "cv.pdf");
  const pdf = buildPdf([
    "RESUME — YOUR NAME",
    "",
    "Developer Portfolio Citation CV",
    "",
    "Placeholder — replace public/cv.pdf with your resume.",
  ]);
  fs.writeFileSync(out, pdf);
  console.log("OK cv.pdf", (pdf.length / 1024).toFixed(1), "KB");
}

texture()
  .then(cv)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });