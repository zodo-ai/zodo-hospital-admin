import jsPDF from "jspdf";
import logo from "../assets/img/logo.png";

export const generateCaseSheetPDF = (appointment) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  if (appointment.hospital) {
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(appointment.hospital.name, pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    if (appointment.hospital.address) {
      const address = `${appointment.hospital.address.lineTwo || appointment.hospital.address.lineOne}, ${appointment.hospital.address.city}, ${appointment.hospital.address.state} ${appointment.hospital.address.postalCode}`;
      doc.text(address, pageWidth / 2, 27, { align: "center" });
    }

    if (appointment.hospital.contact_details) {
      const contactInfo = `${appointment.hospital.contact_details.email} • ${appointment.hospital.contact_details.mobile}`;
      doc.text(contactInfo, pageWidth / 2, 34, { align: "center" });
    }
  }

  // Horizontal line
  doc.setLineWidth(0.5);
  doc.line(15, 40, pageWidth - 15, 40);

  // Patient Information Section
  let yPosition = 50;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  const patientName = appointment.user_details?.name || appointment.user?.first_name || "N/A";
  const gender = appointment.user_details?.gender || appointment.user?.gender || "N/A";
  const age = appointment.user_details?.age || appointment.user?.age || "N/A";
  const appointmentDate = new Date(appointment.appointmentDate).toLocaleDateString('en-GB');

  doc.text(`Name : ${patientName}`, 20, yPosition);
  doc.text(`Sex : ${gender}`, 120, yPosition);
  doc.text(`Age : ${age}`, 20, yPosition + 10);
  doc.text(`Date : ${appointmentDate}`, 120, yPosition + 10);

  // Hospital logo as watermark
  if (appointment.hospital.logo) {
    try {
      // Extract file extension to determine format
      const extension = appointment.hospital.logo.split('.').pop().toLowerCase();
      const supportedFormats = ['png', 'jpg', 'jpeg'];
      const imageFormat = supportedFormats.includes(extension) ? extension.toUpperCase() : 'PNG';

      const watermarkWidth = 100; // Adjust size as needed
      const watermarkHeight = 100; // Adjust size as needed
      doc.setGState(new doc.GState({ opacity: 0.2 })); // Set transparency for watermark
      doc.addImage(
        appointment.hospital.logo,
        imageFormat,
        pageWidth / 2 - watermarkWidth / 2,
        pageHeight / 2 - watermarkHeight / 2,
        watermarkWidth,
        watermarkHeight
      );
      doc.setGState(new doc.GState({ opacity: 1 })); // Reset opacity
    } catch (error) {
      console.error('Error adding watermark image:', error);
      // Fallback to text-based watermark
      doc.setFontSize(30);
      doc.setTextColor(200, 200, 200);
      doc.setFont("helvetica", "bold");
      doc.text(appointment.hospital.name, pageWidth / 2, pageHeight / 2, { align: "center" });
      doc.setTextColor(0, 0, 0);
    }
  } else {
    // Fallback if no logo is provided
    doc.setFontSize(30);
    doc.setTextColor(200, 200, 200);
    doc.setFont("helvetica", "bold");
    doc.text(appointment.hospital.name, pageWidth / 2, pageHeight / 2, { align: "center" });
    doc.setTextColor(0, 0, 0);
  }

  yPosition = pageHeight - 40;
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPosition, pageWidth - 20, yPosition);

  yPosition += 10;
  const logoWidth = 40;
  const logoHeight = 15;
  doc.addImage(logo, 'PNG', pageWidth / 2 - logoWidth / 2, yPosition, logoWidth, logoHeight);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated on: ${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' })}`, pageWidth / 2, yPosition + logoHeight + 5, { align: "center" });

  doc.autoPrint();
  doc.output('dataurlnewwindow');
};