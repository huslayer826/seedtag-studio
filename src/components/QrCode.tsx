import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QrCodeProps {
  value: string;
  label: string;
  size?: number;
}

export function QrCodeImage({ value, label, size = 84 }: QrCodeProps) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    let active = true;
    const trimmed = value.trim();
    if (!trimmed) {
      setDataUrl("");
      return;
    }

    QRCode.toDataURL(trimmed, {
      margin: 1,
      width: size,
      color: {
        dark: "#1f3328",
        light: "#ffffff"
      }
    })
      .then((nextUrl) => {
        if (active) {
          setDataUrl(nextUrl);
        }
      })
      .catch(() => {
        if (active) {
          setDataUrl("");
        }
      });

    return () => {
      active = false;
    };
  }, [label, size, value]);

  if (!value.trim()) {
    return <div className="qr-placeholder">Care link</div>;
  }

  return dataUrl ? (
    <img className="qr-code" src={dataUrl} width={size} height={size} alt={`${label} care link code`} />
  ) : (
    <div className="qr-placeholder">Code</div>
  );
}

