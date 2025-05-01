'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import MFILogo from "@/public/images/mfi.png";

export default function Home() {
  const [qrCode, setQrCode] = useState('');

  const formUrl = "https://docs.google.com/forms/u/0/d/1mBOEENnfPjjlWFA-7AGAak9dvZAkN361NFaLf-0ShzQ/edit";

  useEffect(() => {
    QRCode.toDataURL(formUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#FFFFFF',
        light: '#000000',
      }
    })
      .then(url => {
        setQrCode(url);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative">

      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={MFILogo}
          alt="MFI Logo Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="mb-12">
          <div className="rounded-full border-4 border-black p-1 bg-black inline-block">
            <Image
              src="/images/icc.png"
              alt="ICC Logo"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-800/90 to-blue-800/90 p-8 rounded-2xl shadow-2xl flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Scannez pour accéder au formulaire
          </h1>

          {qrCode && (
            <div className="bg-white p-4 rounded-xl shadow-inner">
              <img
                src={qrCode}
                alt="QR Code"
                className="w-[250px] h-[250px]"
              />
            </div>
          )}

          <p className="mt-6 text-sm text-gray-300 text-center">
            Utilisez votre appareil mobile pour scanner le QR code
          </p>
        </div>
      </div>
    </div>
  );
}
