# README for Interactive 3D Web Experience

## Overview

This project is a web-based interactive 3D experience built using Next.js, Three.js, and GSAP. It features a dynamic 3D scene with a GLTF model (inspired by the Mammoth Meatballs website), interactive camera transitions, and real-time effects like snowfall, film grain, and bloom. Users are introduced to the experience through an engaging intro screen and can interact with the scene via mouse and scroll events.

## Features

- **3D Scene Rendering**: Utilizes Three.js for complex scene rendering with realistic lighting, shadows, and post-processing effects.
- **Dynamic Animations**: Smooth transitions and animations are powered by GSAP.
- **Interactive Controls**: Mouse movements adjust the model’s orientation, while scroll events trigger camera transitions.
- **Real-Time Effects**: Incorporates effects such as snowfall, film grain, and bloom to enhance visual engagement.
- **Responsive Design**: Automatically adjusts to different screen sizes and resolutions.

## Technologies Used

- **Next.js & React**: For building the user interface and managing client-side interactions.
- **TypeScript**: Provides type safety and improved code maintainability.
- **Three.js**: Renders the 3D scene and handles advanced visual effects.
- **GSAP**: Manages robust animations and transitions.
- **TailwindCSS & PostCSS**: Used for modern styling and CSS workflows.

## Installation

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/charbelmalo/3d-mammoth
   cd 3d-mammoth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1. On loading the application, an introductory screen presents the narrative of the project.
2. After the intro fades, users enter the interactive 3D scene where they can:
   - Scroll to trigger camera transitions and scene adjustments.
   - Move the mouse to interact with the 3D model’s orientation.
   - Enjoy real-time visual effects that enhance the overall experience.

## Customization

- **Scene Adjustments**: Modify `components/Scene.tsx` to tweak lighting, effects, or model animations.
- **UI Components**: Update components in the `components/ui` folder to customize the look and feel of interactive elements.
- **Animation Timings**: Adjust GSAP parameters in `app/page.tsx` to fine-tune the speed and style of transitions.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with descriptive messages.
4. Open a pull request to discuss your modifications.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Assumptions and Limitations

- **Scene Construction**: The model and the scene have been constructed based on the Mammoth Meatballs website without an exact 3D scene to follow, so some variables are approximated and may not be 100% accurate.
- **Custom Grain Shader**: For the noise layer, it has been custom-made using threejs fragment shader and it has been added to the 3D scene itself rather than site-wide for simplicity's sake and to complete the assessment exercise on time.
- **Next.js Project structure**: The project structure has been implemented in Next.js; however, further improvements can be made with closer adherence to best practices.
- **Footprint Linking**: The left and right foot bone references are triggered based on a hard-coded quaternion parameter, as access to the full 3D scene was limited, meaning that the bone linkage to the ground layer may not always be perfectly aligned.

