# 🛡️ SecureStay | Touchless Visitor Management System v3.0

SecureStay is a high-security, full-stack terminal designed to bridge physical building security with digital automation. It features a completely touchless checkout flow using dynamic QR codes and integrated webcam scanning.

---------------------------------------------------------
🚀 ADVANCED FEATURES
---------------------------------------------------------
* Touchless QR Lifecycle:
   - Backend generates a unique QR code for every visitor using the ZXing library.
   - The system sends a professional HTML email pass directly to the visitor's inbox.
* Integrated Webcam Scanner:
   - Real-time scanning using the html5-qrcode library.
   - Automatically identifies visitors and updates database status without manual input.
* Dual-Notification System:
   - Instant arrival alerts for Hosts.
   - Digital Pass delivery for Visitors via MIME-Multi-part emails.
* Dynamic Theme Engine: Seamless Day/Night mode transition for 24/7 security desk operations.

---------------------------------------------------------
🛠️ UPDATED TECH STACK
---------------------------------------------------------
* Backend: Java 17, Spring Boot 3, Spring Data JPA
* QR Logic: Google ZXing (Zebra Crossing) Library
* Database: MySQL 8.0
* Security/Mail: Spring Mail (MimeMessage with Inline CID attachments)
* Frontend: Vanilla JS (Async/Await), HTML5-QRCode, CSS3 Variables
* Dev Tools: IntelliJ IDEA, Maven, Git

---------------------------------------------------------
📂 UPDATED PROJECT STRUCTURE
---------------------------------------------------------
src/main/java/com/securestay/
|-- service/VisitorService.java  # Core Logic: QR Gen & HTML Emailing
|-- controller/                  # REST Endpoints for Scan/Check-in
|-- repository/                  # Persistence Layer

src/main/resources/
|-- static/index.html            # Touchless Terminal UI
|-- application.properties       # SMTP & DB Configuration

---------------------------------------------------------
⚙️ SETUP & INSTALLATION
---------------------------------------------------------
1. Add ZXing Dependency:
   Ensure your pom.xml includes the 'com.google.zxing' artifacts.

2. Configure SMTP:
   Ensure 'spring.mail.password' uses a valid Google App Password.

3. Headless Mode:
   The application main method must set 'java.awt.headless' to 'false'
   to support server-side image rendering.

4. Run:
   Visit http://localhost:8080/index.html to access the terminal.

---------------------------------------------------------
👨‍💻 DEVELOPED BY
---------------------------------------------------------
Pratham Kadam
CSE (Data Science) Student