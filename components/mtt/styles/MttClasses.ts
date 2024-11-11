import plugin from "tailwindcss/plugin";

const MttClasses = plugin(function ({ addUtilities }) {
  const newUtilities = {
".mtt-Alpha":{
  "@apply !bg-Alpha border border-Alpha5": {},
},
".mtt-Alpha1":{
  "@apply !bg-Alpha1 border border-Alpha5": {},
},
".mtt-Alpha2":{
  "@apply !bg-Alpha2 border border-Alpha5": {},
},
".mtt-Alpha3":{
  "@apply !bg-Alpha3 border border-Alpha5": {},
},
".mtt-Alpha4":{
  "@apply !bg-Alpha4 border border-Alpha5": {},
},
".mtt-Alpha5":{
  "@apply !bg-Alpha5 border border-Alpha5": {},
},
".mtt-BaseShadeHover":{
  "@apply !bg-BaseShade hover:!bg-BaseShade3": {},
},
".mtt-BaseShadeHover1":{
  "@apply !bg-BaseShade1 hover:!bg-BaseShade4": {},
},
".mtt-BaseShadeHover2":{
  "@apply !bg-BaseShade2 hover:!bg-BaseShade5": {},
},
".mtt-BaseShadeHover3":{
  "@apply !bg-BaseShade3 hover:!bg-BaseShade5": {},
},
".mtt-BaseShadeHover4":{
  "@apply !bg-BaseShade4 hover:!bg-BaseShade1": {},
},
".mtt-BaseShadeHover5":{
  "@apply !bg-BaseShade5 hover:!bg-BaseShade1": {},
},

".mtt-BaseShadeHoverWhite":{
  "@apply bg-BaseShadeWhite dark:bg-BaseShade hover:!bg-BaseShade3": {},
},
".mtt-BaseShadeHover1White":{
  "@apply bg-BaseShade1White dark:bg-BaseShade1 hover:!bg-BaseShade3": {},
},
".mtt-BaseShadeHover2White":{
  "@apply bg-BaseShade2White dark:bg-BaseShade2 hover:!bg-BaseShade3": {},
},
".mtt-BaseShadeHover3White":{
  "@apply bg-BaseShade3White dark:bg-BaseShade3 hover:!bg-BaseShade3": {},
},
".mtt-BaseShadeHover4White":{
  "@apply bg-BaseShade4White dark:bg-BaseShade4 hover:!bg-BaseShade3": {},
},
".mtt-BaseShadeHover5White":{
  "@apply bg-BaseShade5White dark:bg-BaseShade5 hover:!bg-BaseShade3": {},
},
".mtt-center": {
    "@apply flex items-center justify-center": {},
  },
  ".mtt-xy-screen": {
    "@apply h-screen w-screen": {},
  },
  ".mtt-x-screen": {
    "@apply w-screen": {},
  },
  ".mtt-y-screen": {
    "@apply h-screen": {},
  },
  ".mtt-padding-md": {
    "@apply px-[15px] sm:px-[50px] lg:px-[80px] xl:px-[120px]": {},
  },
  ".mtt-padding-sm": {
    "@apply px-[15px] sm:px-[40px] lg:px-[60px] xl:px-[80px]": {},
  },
  ".mtt-padding": {
    "@apply px-[15px] sm:px-[20px] lg:px-[40px] xl:px-[60px]": {},
  },
  ".mtt-RightPadding": {
    "@apply pr-[15px] sm:pr-[20px] lg:pr-[20px] xl:pr-[30px]": {},
  },
  ".mtt-RightPadding-sm": {
    "@apply pr-[15px] sm:pr-[40px] lg:pr-[60px] xl:pr-[80px]": {},
  },
  ".mtt-RightPadding-md": {
    "@apply pr-[15px] sm:pr-[50px] lg:pr-[80px] xl:pr-[120px]": {},
  },
  
  };

  addUtilities(newUtilities);
});

export default MttClasses;

