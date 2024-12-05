import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Sidebar from '@/components/Sidebar';
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [showWaitlistMessage, setShowWaitlistMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = isValidEmail(email) && isValidEmail(partnerEmail);

  const handleSubmit = async () => {
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/addToWaitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, partnerEmail }),
      });

      if (response.ok) {
        setShowWaitlistMessage(true);
      }
    } catch (error) {
      console.error('Error adding to waitlist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Love talks</title>
        <meta name="description" content="Talk with your loved one, with ai" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div style={{
        display: "flex", 
        color: "#fff", 
        flexDirection: "row", 
        backgroundColor: "#FFF6F8", 
        width: "100vw", 
        overflow: 'hidden',
        height: "100vh",
        transition: "all 0.3s ease-in-out"
      }}>
        <Sidebar />
        <div style={{width: "100%", color: "#67003E", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{
            display: 'flex', 
            borderRadius: 16, 
            width: 380, 
            backgroundColor: "#fff", 
            padding: 32, 
            alignItems: "center", 
            flexDirection: "column",
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease-in-out",
            transform: showEmailForm ? "scale(1.02)" : "scale(1)"
          }}>
            {!showEmailForm ? (
              <>
                <p style={{fontSize: 28, fontWeight: 700}}>Love Talks</p>
                <p style={{fontSize: 16, marginTop: 8, textAlign: 'center'}}>
                  group chat with you, your<br/>
                  partner, and an ai
                </p>
                <div style={{width: "280px", fontWeight: 600, alignItems: "center", gap: 8, marginTop: 16, padding: 8, borderRadius: 8, backgroundColor: "#F7F3F3", display: "flex", flexDirection: "row"}}>
                  <img src="1.svg"/>
                  <p>unbiased AI love facilitator</p>
                </div>
                <div style={{width: "280px", fontWeight: 600, alignItems: "center", gap: 8, marginTop: 12, padding: 8, borderRadius: 8, backgroundColor: "#F7F3F3", display: "flex", flexDirection: "row"}}>
                  <img src="2.svg"/>
                  <p>understand partner’s feelings</p>
                </div>
                <div style={{width: "280px", fontWeight: 600, alignItems: "center", gap: 8, marginTop: 12, padding: 8, borderRadius: 8, backgroundColor: "#F7F3F3", display: "flex", flexDirection: "row"}}>
                  <img src="3.svg"/>
                  <p>listen to each other</p>
                </div>
                <div 
                  style={{
                    backgroundColor: "#67003E", 
                    cursor: "pointer", 
                    color: "#fff", 
                    padding: "12px 24px", 
                    borderRadius: 32, 
                    marginTop: 24,
                    transition: "all 0.2s ease-in-out",
                    transform: "translateY(0)",
                    boxShadow: "0 4px 6px rgba(103, 0, 62, 0.2)",
                    ":active": {
                      transform: "translateY(2px)",
                      boxShadow: "0 2px 4px rgba(103, 0, 62, 0.2)",
                    },
                    ":hover": {
                      backgroundColor: "#7a0049",
                    }
                  }}
                  onClick={() => setShowEmailForm(true)}
                >
                  Continue
                </div>
              </>
            ) : (
              <>
                <p style={{fontSize: 28, fontWeight: 700}}>Invite Your Partner</p>
                <div style={{width: "100%", marginTop: 24}}>
                  <p style={{fontSize: 14, marginBottom: 8}}>your email</p>
                  <input 
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: 8,
                      border: "1px solid #E5E5E5",
                      marginBottom: 16
                    }}
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p style={{fontSize: 14, marginBottom: 8}}>partner's email</p>
                  <input 
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: 8,
                      border: "1px solid #E5E5E5",
                      marginBottom: 24
                    }}
                    type="email"
                    placeholder="Enter partner's email"
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                  />
                  {showWaitlistMessage ? (
                    <p style={{
                      textAlign: "center",
                      color: "#67003E",
                      marginTop: 16
                    }}>
                      Opps, our server isn't ready for you right now. We're adding you to the waitlist
                    </p>
                  ) : (
                    <div 
                      style={{
                        backgroundColor: isFormValid ? "#67003E" : "#67003E33",
                        cursor: isFormValid ? "pointer" : "not-allowed",
                        color: isFormValid ? "#fff" : "#67003E99",
                        padding: "12px 24px",
                        borderRadius: 32,
                        textAlign: "center",
                        transform: "translateY(0)",
                        transition: "transform 0.1s ease-in-out",
                        boxShadow: isFormValid ? "0 4px 6px rgba(103, 0, 62, 0.2)" : "none",
                        userSelect: "none",
                        ...(isFormValid && !isSubmitting && {
                          ':active': {
                            transform: "translateY(2px)",
                            boxShadow: "0 2px 4px rgba(103, 0, 62, 0.2)",
                          }
                        })
                      }}
                      onClick={isFormValid && !isSubmitting ? handleSubmit : undefined}
                    >
                      {isSubmitting ? "Starting..." : "Start Talk"}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
