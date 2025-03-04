"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";

import TextScrambler from "@/components/TextScrambler";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ),
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (containerRef.current) {
      // Select key child elements to animate.
      const elements = containerRef.current.querySelectorAll(
        ".Heading_container__Mmg3Y, .Heading_heading__9fe8J, .Heading_dnaDetail__8pYTX, .Heading_lineBlockTwo__3RdlC, .Heading_lineBlockOne___MR_J, .Heading_image__fwq9l, .Heading_subheading__iy_dt.scramble, .Heading_subheadingLabel__GRUcO, .Heading_lineOne__KvOe7, .Heading_lineTwo__QRsF4, .Heading");
      //     const allElements = containerRef.current.querySelectorAll('.Heading_container__Mmg3Y');
      //     gsap.from(allElements, {
      //     opacity: 0,
      //     y: -50,
      //     duration: 1,
      //     stagger: 0.3,
      //     delay: 1,
      //     ease: "power4.out"
      // });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        delay: 1,
        ease: "power4.out",
      });
    }
  }, []);


  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Scene />
      <div className="absolute flex items-center justify-center pointer-events-none">
        <div
          ref={containerRef}
          className="BlockExplore_headingContainer__MfPhI"
          style={{ transform: "translate(12vw, 60%)" }}
      >
        <div className="Heading_container__Mmg3Y" style={{ opacity: 0 }}>
          <span
            className="Heading_subheading__iy_dt scramble"
            style={{ opacity: 0, visibility: "inherit", transform: "translate(0px, -50px)" }}
          >
            Step 1
          </span>
          <div style={{ opacity: 0, transform: "translate(0px, -50px)" }}>
            <hr className="LineBlock_line__uU7Kx" style={{ visibility: "inherit" }} />
            <span
              className="LineBlock_block__DACyE"
              style={{ transform: "translate(-224px, 0px)" }}
            />
          </div>
          <span
            className="Heading_subheadingLabel__GRUcO"
            style={{ opacity: 0, visibility: "inherit", transform: "translate(0px, -50px)" }}
          >
            <span className="scramble" style={{ opacity: 0, visibility: "inherit" }}>
              The
            </span>
            <span className="scramble" style={{ opacity: 0, visibility: "inherit" }}>
              Recipe
            </span>
          </span>
          <div
            className="Heading_lineBlockOne___MR_J LineBlock_container__FauJJ"
            style={{ opacity: 0, visibility: "inherit", transform: "translate(0px, -50px)" }}
          >
            <hr
              className="LineBlock_line__uU7Kx"
              style={{ opacity: 0, visibility: "inherit" }}
            />
            <span
              className="LineBlock_block__DACyE"
              style={{ opacity: 0, visibility: "inherit" }}
            />
          </div>
          <div
            className="Heading_heading__9fe8J"
            style={{ opacity: 0, visibility: "inherit", transform: "translate(0px, -50px)" }}
          >
            <span className="Heading_headingLines__6kvrr">
              <span
                style={{
                  opacity: 1,
                  visibility: "inherit",
                  transform: "translate(0px, -50px)",
                }}
              >
                Identifying
              </span>
              <span
                style={{
                  opacity: 1,
                  visibility: "inherit",
                  transform: "translate(0px, -50px)",
                }}
              >
                the
              </span>
              <span
                style={{
                  opacity: 1,
                  visibility: "inherit",
                  transform: "translate(0px, -50px)",
                }}
              >
                right gene
              </span>
            </span>
          </div>
          <span
            className="Heading_lineOne__KvOe7"
            style={{ opacity: 0, visibility: "inherit", transform: "translate(0px, -50px)" }}
          />
          <span
            className="Heading_lineTwo__QRsF4"
            style={{ opacity: 0, visibility: "inherit", transform: "translate(0px, -50px)" }}
          />
          <svg
            className="Heading_dnaDetail__8pYTX"
            width="50"
            height="58"
            viewBox="0 0 50 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0, visibility: "inherit", transform: "translate(0px, -50px)" }}
          >
            <g>
              <path
                opacity="0.45"
                d="M49.0044 4.92841C48.3739 2.61264 46.2764 1.01221 43.8757 1.01221H40.0686C37.668 1.01221 35.5705 2.61264 34.94 4.92841L33.8124 9.07497C33.5959 9.86666 33.4707 10.6835 33.4751 11.4999C33.4709 12.2839 33.3648 13.0675 33.157 13.8277L32.0294 17.9743C31.3989 20.29 29.3014 21.8905 26.9007 21.8905H23.0937C20.693 21.8905 18.5955 20.29 17.965 17.9743L16.8374 13.8277C16.6296 13.0675 16.5235 12.2839 16.5193 11.4999C16.5248 10.6795 16.4115 9.8584 16.1939 9.06277L15.0663 4.9162C14.4359 2.60043 12.3383 1 9.93768 1H6.1306C5.00303 1 3.93607 1.35161 3.06311 1.96996C2.59026 2.30944 2.17803 2.69743 1.81429 3.20665C1.45056 3.71588 1.1717 4.28573 1.00195 4.9162"
                stroke="#D4898C"
                strokeMiterlimit={10}
                className="Heading_dnaString__kSUW1"
                style={{ strokeDashoffset: 0 }}
              />
              <path
                opacity="0.45"
                d="M49.0023 18.0837C48.3718 20.3995 46.2743 21.9999 43.8736 21.9999H40.0665C37.6659 21.9999 35.5684 20.3995 34.9379 18.0837L33.8103 13.9371C33.6024 13.1769 33.4964 12.3934 33.4922 11.6094C33.4966 10.793 33.3718 9.97603 33.1554 9.18435L32.0278 5.03778C31.3973 2.72201 29.2998 1.12158 26.8992 1.12158H23.0921C20.6914 1.12158 18.5939 2.72201 17.9634 5.03778L16.8358 9.18435C16.6194 9.97603 16.5056 10.793 16.51 11.6094C16.5048 12.3893 16.3988 13.1686 16.192 13.9249L15.0644 18.0715C14.4339 20.3873 12.3364 21.9877 9.93573 21.9877H6.12865C3.728 21.9877 1.63047 20.3873 1 18.0715"
                stroke="#D4898C"
                strokeMiterlimit={10}
                className="Heading_dnaString__kSUW1"
                style={{ strokeDashoffset: 0 }}
              />
              <path
                opacity="0.45"
                d="M4.80859 6.06738V16.8218"
                stroke="#D4898C"
                strokeWidth="0.5"
                strokeMiterlimit={10}
                style={{ opacity: 0.45 }}
              />
              <path
                opacity="0.45"
                d="M8.0625 4.5293L8.0625 18.2931"
                stroke="#D4898C"
                strokeWidth="0.5"
                strokeMiterlimit={10}
                style={{ opacity: 0.45 }}
              />
              <path
                opacity="0.45"
                d="M11.248 6.06738V16.8218"
                stroke="#D4898C"
                strokeWidth="0.5"
                strokeMiterlimit={10}
                style={{ opacity: 0.45 }}
              />
              <path
                opacity="0.45"
                d="M21.7832 6.06738V16.8218"
                stroke="#D4898C"
                strokeWidth="0.5"
                strokeMiterlimit={10}
                style={{ opacity: 0.45 }}
              />
              <path
                opacity="0.45"
                d="M25.001 4.5293L25.001 18.2931"
                stroke="#D4898C"
                strokeWidth="0.5"
                strokeMiterlimit={10}
                style={{ opacity: 0.45 }}
              />
              <path
                opacity="0.45"
                d="M28.2227 6.06738V16.8218"
                stroke="#D4898C"
                strokeWidth="0.5"
                strokeMiterlimit={10}
                style={{ opacity: 0.45 }}
              />
              <path
                opacity="0.45"
                d="M38.7451 6.06738V16.8218"
                stroke="#D4898C"
                strokeWidth="0.5"
                strokeMiterlimit={10}
                style={{ opacity: 0.45 }}
              />
              <path
                opacity="0.45"
                d="M41.9395 4.5293L41.9395 18.2931"
                stroke="#D4898C"
                strokeWidth="0.5"
                strokeMiterlimit={10}
                style={{ opacity: 0.45 }}
              />
              <path
                opacity="0.45"
                d="M45.1973 6.06738V16.8218"
                stroke="#D4898C"
                strokeWidth="0.5"
                strokeMiterlimit={10}
                style={{ opacity: 0.45 }}
              />
              <g className="Heading_dnaCopy__FsCYP" style={{ opacity: 1 }}>
                <path
                  d="M1.34 37H1.785V35.525C1.785 35.195 1.74 34.575 1.71 34.275H1.72L1.92 34.975L2.33 36.135H2.645L3.06 34.975L3.26 34.275H3.275C3.25 34.575 3.2 35.195 3.2 35.525V37H3.655V33.73H3.08L2.65 35.065L2.51 35.575H2.49L2.34 35.065L1.915 33.73H1.34V37ZM5.83805 37H6.28305V35.525C6.28305 35.195 6.23805 34.575 6.20805 34.275H6.21805L6.41805 34.975L6.82805 36.135H7.14305L7.55805 34.975L7.75805 34.275H7.77305C7.74805 34.575 7.69805 35.195 7.69805 35.525V37H8.15305V33.73H7.57805L7.14805 35.065L7.00805 35.575H6.98805L6.83805 35.065L6.41305 33.73H5.83805V37ZM11.7561 37.06C12.1911 37.06 12.5261 36.89 12.7861 36.585L12.5011 36.28C12.3061 36.495 12.0861 36.625 11.8061 36.625C11.2161 36.625 10.8211 36.14 10.8211 35.355C10.8211 34.585 11.2161 34.105 11.7961 34.105C12.0611 34.105 12.2661 34.215 12.4311 34.385L12.7161 34.07C12.5161 33.86 12.1961 33.67 11.7961 33.67C10.9361 33.67 10.3061 34.31 10.3061 35.37C10.3061 36.445 10.9461 37.06 11.7561 37.06ZM14.8341 37H15.2791V35.525C15.2791 35.195 15.2341 34.575 15.2041 34.275H15.2141L15.4141 34.975L15.8241 36.135H16.1391L16.5541 34.975L16.7541 34.275H16.7691C16.7441 34.575 16.6941 35.195 16.6941 35.525V37H17.1491V33.73H16.5741L16.1441 35.065L16.0041 35.575H15.9841L15.8341 35.065L15.4091 33.73H14.8341V37ZM23.9502 37.8H24.3852L26.0252 33.45H25.5902L23.9502 37.8ZM33.9863 37.06C34.7013 37.06 35.1463 36.465 35.1463 35.4C35.1463 34.325 34.7013 33.755 33.9863 33.755C33.2663 33.755 32.8213 34.325 32.8213 35.4C32.8213 36.465 33.2663 37.06 33.9863 37.06ZM33.9863 36.665C33.5713 36.665 33.2763 36.29 33.2763 35.4C33.2763 34.505 33.5713 34.15 33.9863 34.15C34.3963 34.15 34.6913 34.505 34.6913 35.4C34.6913 36.29 34.3963 36.665 33.9863 36.665ZM33.9863 35.715C34.1613 35.715 34.3113 35.585 34.3113 35.37C34.3113 35.16 34.1613 35.025 33.9863 35.025C33.8063 35.025 33.6563 35.16 33.6563 35.37C33.6563 35.585 33.8063 35.715 33.9863 35.715ZM37.4444 37H39.6444V36.595H38.8444V33.815H38.4744C38.2594 33.935 38.0244 34.01 37.6344 34.065V34.385H38.3444V36.595H37.4444V37Z"
                  fill="#272427"
                />
              </g>
            </g>
          </svg>
          <div
            className="Heading_lineBlockTwo__3RdlC LineBlock_container__FauJJ LineBlock_alignment--left__cYV_9"
            style={{
              transform: "translate(0px, -50px)",
              opacity: 0,
              top: "-82px",
              position: "relative",
            }}
          >
            <hr className="LineBlock_line__uU7Kx" style={{ visibility: "inherit" }} />
            <span
              className="LineBlock_block__DACyE"
              style={{ transform: "translate(-224px, 0px)" }}
            />
          </div>
          <img
            src="/assets/explore-heading-textual-decoration.png"
            className="Heading_image__fwq9l"
            alt=""
            width={279}
            height={26}
            style={{ opacity: 0, transform: "translate(0px, -50px)", position: "relative" , top: "-82px"}}
          />
        </div>
      </div>
    </div>
    </main>
  );
}