import { useNavigate } from "react-router-dom";


function Credentials() {
  const navigate = useNavigate();


  /* =====================================================
     LOAD USER
  ===================================================== */

  const currentUser = JSON.parse(
    localStorage.getItem(
      "nextpathCurrentUser"
    ) || "null"
  );


  /* =====================================================
     LOAD CAREER
  ===================================================== */

  const careerData = JSON.parse(
    localStorage.getItem(
      "nextpathTargetCareerData"
    ) || "null"
  );


  /* =====================================================
     LOAD VERIFIED SKILLS
  ===================================================== */

  const verifiedSkills = JSON.parse(
    localStorage.getItem(
      "nextpathVerifiedSkills"
    ) || "{}"
  );


  /* =====================================================
     LOAD CERTIFICATES
  ===================================================== */

  const certificates = JSON.parse(
    localStorage.getItem(
      "nextpathCertificates"
    ) || "[]"
  );


  const studentName =
    currentUser?.fullName ||
    currentUser?.name ||
    "NEXTPATH Learner";


  const verifiedSkillNames =
    Object.keys(
      verifiedSkills
    );


  /* =====================================================
     PRINT CERTIFICATE
  ===================================================== */

  const printCertificate = (
    certificate
  ) => {

    const printWindow =
      window.open(
        "",
        "_blank",
        "width=1000,height=750"
      );


    if (!printWindow) {
      alert(
        "Please allow pop-ups to view the certificate."
      );

      return;
    }


    const issueDate =
      certificate.issuedAt
        ? new Date(
            certificate.issuedAt
          ).toLocaleDateString()
        : new Date().toLocaleDateString();


    printWindow.document.write(`
      <!DOCTYPE html>

      <html>

      <head>

        <title>
          NEXTPATH Certificate
        </title>

        <style>

          body {
            margin: 0;
            padding: 40px;
            font-family: Arial, sans-serif;
            background: #f4f5f7;
          }

          .certificate {
            max-width: 900px;
            margin: auto;
            background: white;
            border: 8px solid #111827;
            padding: 55px;
            text-align: center;
            box-sizing: border-box;
          }

          .brand {
            color: #C9151E;
            font-size: 22px;
            font-weight: 900;
            letter-spacing: 4px;
          }

          h1 {
            font-size: 40px;
            margin-top: 20px;
          }

          .subtitle {
            color: #6B7280;
            font-size: 18px;
          }

          .name {
            font-size: 34px;
            font-weight: 800;
            margin: 30px 0 10px;
          }

          .skill {
            color: #C9151E;
            font-size: 42px;
            font-weight: 900;
            margin: 25px 0;
          }

          .score-box {
            display: flex;
            justify-content: center;
            gap: 50px;
            margin: 35px 0;
          }

          .metric {
            padding: 15px 25px;
            background: #F9FAFB;
            border-radius: 10px;
          }

          .metric strong {
            font-size: 24px;
          }

          .footer {
            margin-top: 40px;
            color: #4B5563;
            font-size: 14px;
          }

          .verified {
            margin-top: 20px;
            color: #166534;
            font-weight: 800;
          }

          @media print {

            body {
              background: white;
              padding: 0;
            }

            button {
              display: none;
            }

          }

        </style>

      </head>

      <body>

        <div class="certificate">

          <div class="brand">
            NEXTPATH
          </div>

          <h1>
            Certificate of Skill Verification
          </h1>

          <p class="subtitle">
            This certificate confirms that
          </p>

          <div class="name">
            ${studentName}
          </div>

          <p class="subtitle">
            has successfully demonstrated the
            required proficiency in
          </p>

          <div class="skill">
            ${certificate.skill}
          </div>

          <p>
            Target Career:
            <strong>
              ${certificate.career}
            </strong>
          </p>

          <div class="score-box">

            <div class="metric">

              <small>
                Verified Score
              </small>

              <br>

              <strong>
                ${certificate.score}/10
              </strong>

            </div>


            <div class="metric">

              <small>
                Required Score
              </small>

              <br>

              <strong>
                ${certificate.requiredScore}/10
              </strong>

            </div>

          </div>

          <div class="verified">
            ✓ NEXTPATH SKILL VERIFIED
          </div>

          <div class="footer">

            <p>
              Issue Date:
              ${issueDate}
            </p>

            <p>
              Certificate ID:
              ${certificate.id}
            </p>

            <p>
              NEXTPATH Career Intelligence Platform
            </p>

          </div>

        </div>

        <script>

          window.onload = function() {
            window.print();
          };

        </script>

      </body>

      </html>
    `);


    printWindow.document.close();

  };


  /* =====================================================
     NO VERIFIED SKILLS
  ===================================================== */

  if (
    verifiedSkillNames.length === 0
  ) {

    return (

      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >

        <p style={sectionLabel}>
          VERIFIED CREDENTIALS
        </p>


        <h1>
          Your Credentials
        </h1>


        <div style={emptyCard}>

          <div
            style={{
              fontSize: "45px",
              marginBottom: "15px",
            }}
          >
            ◇
          </div>


          <h2>
            No Verified Skills Yet
          </h2>


          <p
            style={{
              color: "#6B7280",
              lineHeight: "1.7",
            }}
          >

            Complete your personalized roadmap
            and pass a progress re-assessment to
            earn NEXTPATH skill verification
            credentials.

          </p>


          <button
            style={primaryButton}
            onClick={() =>
              navigate("/progress")
            }
          >
            Continue Learning →
          </button>

        </div>

      </div>

    );

  }


  return (

    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        paddingBottom: "50px",
      }}
    >

      {/* HEADER */}

      <p style={sectionLabel}>
        VERIFIED CREDENTIALS
      </p>


      <h1
        style={{
          fontSize: "38px",
          marginBottom: "8px",
        }}
      >
        Your Skill Credentials
      </h1>


      <p
        style={{
          color: "#6B7280",
          lineHeight: "1.7",
          maxWidth: "850px",
        }}
      >

        These credentials were unlocked after
        your re-assessment score met or exceeded
        the proficiency required for your target
        career.

      </p>


      {/* SUMMARY */}

      <div style={summaryGrid}>

        <SummaryCard
          title="Verified Skills"
          value={
            verifiedSkillNames.length
          }
        />


        <SummaryCard
          title="Certificates"
          value={
            certificates.length
          }
        />


        <SummaryCard
          title="Target Career"
          value={
            careerData?.career ||
            "Not selected"
          }
        />

      </div>


      {/* VERIFIED SKILLS */}

      <h2>
        Verified Skills
      </h2>


      <div
        style={{
          display: "grid",
          gap: "14px",
          marginBottom: "35px",
        }}
      >

        {verifiedSkillNames.map(
          (skillName) => {

            const skill =
              verifiedSkills[
                skillName
              ];


            return (

              <div
                key={skillName}
                style={verifiedCard}
              >

                <div>

                  <h3
                    style={{
                      margin: "0 0 6px",
                    }}
                  >
                    ✓ {skillName}
                  </h3>


                  <small
                    style={{
                      color: "#6B7280",
                    }}
                  >
                    Verified:
                    {" "}
                    {skill.verifiedAt
                      ? new Date(
                          skill.verifiedAt
                        ).toLocaleDateString()
                      : "Completed"}
                  </small>

                </div>


                <div
                  style={{
                    textAlign: "right",
                  }}
                >

                  <strong
                    style={{
                      fontSize: "20px",
                      color: "#166534",
                    }}
                  >
                    {skill.score}/10
                  </strong>


                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6B7280",
                    }}
                  >
                    Required:
                    {" "}
                    {
                      skill.requiredScore
                    }
                    /10
                  </div>

                </div>

              </div>

            );

          }
        )}

      </div>


      {/* CERTIFICATES */}

      <h2>
        Certificates
      </h2>


      <div style={certificateGrid}>

        {certificates.map(
          (certificate) => (

            <div
              key={
                certificate.id
              }
              style={certificateCard}
            >

              {/* BRAND */}

              <div style={brand}>
                NEXTPATH
              </div>


              <div
                style={{
                  width: "50px",
                  height: "3px",
                  background: "#C9151E",
                  margin: "12px auto 20px",
                }}
              />


              <p
                style={{
                  color: "#6B7280",
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                }}
              >
                CERTIFICATE OF SKILL VERIFICATION
              </p>


              <h2
                style={{
                  color: "#111827",
                  margin: "16px 0",
                }}
              >
                {
                  certificate.skill
                }
              </h2>


              <p
                style={{
                  color: "#6B7280",
                }}
              >
                Awarded to
              </p>


              <h3>
                {studentName}
              </h3>


              <div style={certificateScore}>

                <div>

                  <small>
                    Verified
                  </small>

                  <h3>
                    {
                      certificate.score
                    }
                    /10
                  </h3>

                </div>


                <div>

                  <small>
                    Required
                  </small>

                  <h3>
                    {
                      certificate.requiredScore
                    }
                    /10
                  </h3>

                </div>

              </div>


              <p
                style={{
                  fontSize: "13px",
                  color: "#6B7280",
                }}
              >
                Target:
                {" "}
                <strong>
                  {
                    certificate.career
                  }
                </strong>
              </p>


              <div style={verifiedBadge}>
                ✓ VERIFIED
              </div>


              <p
                style={{
                  fontSize: "11px",
                  color: "#9CA3AF",
                  marginTop: "18px",
                  wordBreak: "break-word",
                }}
              >
                ID:
                {" "}
                {
                  certificate.id
                }
              </p>


              <button
                style={{
                  ...primaryButton,
                  width: "100%",
                  marginTop: "12px",
                }}
                onClick={() =>
                  printCertificate(
                    certificate
                  )
                }
              >
                View / Print Certificate
              </button>

            </div>

          )
        )}

      </div>


      {/* OPPORTUNITIES */}

      <div
        style={{
          background: "#111827",
          color: "#FFFFFF",
          borderRadius: "16px",
          padding: "25px",
          marginTop: "35px",
        }}
      >

        <h2
          style={{
            marginTop: 0,
          }}
        >
          Ready for Opportunities?
        </h2>


        <p
          style={{
            color: "#D1D5DB",
            lineHeight: "1.7",
          }}
        >
          NEXTPATH can now use your verified
          skills and target career to calculate
          job-match scores and connect you with
          relevant opportunities.
        </p>


        <button
          onClick={() =>
            navigate(
              "/opportunities"
            )
          }
          style={{
            ...primaryButton,
            background: "#FFFFFF",
            color: "#111827",
          }}
        >
          Find Matching Opportunities →
        </button>

      </div>


      {/* DISCLAIMER */}

      <p
        style={{
          color: "#9CA3AF",
          fontSize: "11px",
          lineHeight: "1.6",
          marginTop: "20px",
        }}
      >

        NEXTPATH certificates are
        project-issued skill verification
        credentials. They are not official
        certifications from a university,
        Microsoft, Coursera, or another
        third-party organization.

      </p>

    </div>

  );

}


/* =====================================================
   COMPONENTS
===================================================== */

function SummaryCard({
  title,
  value,
}) {

  return (

    <div style={summaryCard}>

      <small
        style={{
          color: "#6B7280",
        }}
      >
        {title}
      </small>


      <h2
        style={{
          margin: "6px 0 0",
        }}
      >
        {value}
      </h2>

    </div>

  );

}


/* =====================================================
   STYLES
===================================================== */

const sectionLabel = {
  color: "#C9151E",
  fontWeight: "800",
  letterSpacing: "1px",
};


const summaryGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "15px",
  margin: "28px 0",
};


const summaryCard = {
  background: "#FFFFFF",
  padding: "20px",
  borderRadius: "14px",
  border: "1px solid #E5E7EB",
};


const verifiedCard = {
  background: "#FFFFFF",
  border: "1px solid #BBF7D0",
  padding: "18px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "15px",
};


const certificateGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};


const certificateCard = {
  background: "#FFFFFF",
  border: "2px solid #111827",
  borderRadius: "16px",
  padding: "28px",
  textAlign: "center",
};


const brand = {
  color: "#C9151E",
  fontWeight: "900",
  letterSpacing: "3px",
};


const certificateScore = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  background: "#F9FAFB",
  padding: "15px",
  borderRadius: "10px",
  margin: "18px 0",
};


const verifiedBadge = {
  display: "inline-block",
  background: "#DCFCE7",
  color: "#166534",
  borderRadius: "999px",
  padding: "7px 13px",
  fontWeight: "800",
  fontSize: "12px",
};


const emptyCard = {
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
  padding: "40px",
  textAlign: "center",
  marginTop: "25px",
};


const primaryButton = {
  background: "#C9151E",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "9px",
  padding: "13px 20px",
  fontWeight: "800",
  cursor: "pointer",
};


export default Credentials;