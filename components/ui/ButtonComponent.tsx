import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  PointerEvent,
} from 'react';
import gsap from 'gsap';
import styles from '@/components/css/ButtonComponent.module.css';

export interface ButtonComponentHandle {
  triggerAnimation: () => void;
  resetAnimation: () => void;
}
interface ButtonComponentProps {
  onClick?: () => void;
}

const ButtonComponent = forwardRef<ButtonComponentHandle, ButtonComponentProps>((props, ref) => {
  const { onClick } = props;
  const pathRef = useRef<SVGPathElement>(null);
  const rectRef = useRef<HTMLSpanElement>(null);

  const triggerAnimation = () => {
    if (pathRef.current) {
      gsap.to(pathRef.current, { strokeDashoffset: 120,  duration: 0.6 ,ease: 'power4.inOut' });
    }
    if (rectRef.current) {
      gsap.to(rectRef.current, { height: 0, duration: 1 ,ease: 'power4.inOut'});
    }
  };

  const resetAnimation = () => {
    if (pathRef.current) {
      gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 0.6 ,ease: 'power4.inOut' });
    }
    if (rectRef.current) {
      gsap.to(rectRef.current, { height: '1.0625rem', duration: 1 ,ease: 'power4.inOut' });
    }
  };
  useImperativeHandle(ref, () => ({
    triggerAnimation,
    resetAnimation,
  }));
  

  return (
    <button
      className={styles.ButtonPrimary_button___n8MG}
      style={{opacity: 0}}
      onPointerEnter={(e: PointerEvent<HTMLButtonElement>) => triggerAnimation()}
      onPointerLeave={(e: PointerEvent<HTMLButtonElement>) => resetAnimation()}
      onClick={onClick}
    >
      <svg
        className={styles.ButtonPrimary_svg__4g5jl}
        width="164"
        height="48"
        viewBox="0 0 164 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          className={styles.ButtonPrimary_svgPath__EZ7n1}
          opacity="0.4"
          stroke="#272427"
          d="M0.5 0.5h163v47H0.5Z"
          style={{ strokeDashoffset: 0 }}
        />
      </svg>
      <span
        ref={rectRef}
        className={styles.ButtonPrimary_rect__65_ST}
        style={{ transform: 'translate(0px, 0px)' }}
      />
      <span
        className={styles.ButtonPrimary_label__ucPTz}
        style={{ opacity: 1, transform: 'translate(0px, 0px)' }}
      >
        Enter site
      </span>
    </button>
  );
});

ButtonComponent.displayName = "ButtonComponent";
export default ButtonComponent;