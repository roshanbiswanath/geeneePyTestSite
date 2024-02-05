import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-separator";
// import Example from "@/components/ui/Carousel";
import { Recorder } from "@geenee/armature";
import { PoseEngine } from "@geenee/bodyprocessors";
import { AvatarRenderer } from "./pose/avatarrenderer";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const engine = new PoseEngine();



let token =
  location.hostname === "localhost"
    ? "MNwBbheyL6ePWwWvFWpSUO7FnuL6i0-J"
    : "dhQagEsYk3uvjx6MhnVmJvjJYp_6i_qb";


if (location.hostname === "twinshirt.vercel.app") {
  token = "uVD7WlVRp8h1Gc6DsJE_Wcq-kNIUHso7";
  console.log("token changed");
}

if(location.hostname === "twinverse.in"){
  console.log("twinverse.in detected")
  token = "pg4RHM5kH5efbgkvqxPv59Q-jf40nOa2"
}

if(location.hostname === "192.168.1.12"){
  console.log("twinverse.in detected")
  token = "TLCW8GwK446prcsEOa3rQPGYSLkvez2F"
}

let rear = true;

// const modelMap = {
//   onesie: {
//     file: "onesie.glb",
//     avatar: false,
//     outfit: {
//       occluders: [/Head$/, /Body/],
//       hidden: [/Eye/, /Teeth/, /Footwear/],
//     },
//   },
//   jacket: {
//     file: "jacket.glb",
//     avatar: false,
//     outfit: {
//       occluders: [/Head$/, /Body/],
//       hidden: [/Eye/, /Teeth/, /Top/, /Bottom/, /Footwear/, /Glasses/],
//     },
//   },
// };

// let bottomOutfit = {
//   occluders: [/Head$/, /Body/],
//   hidden: [/Eye/, /Teeth/, /Top/, /Footwear/, /Glasses/],
// };

let topOutfit = {
  occluders: [/Head$/, /Body/],
  hidden: [/Hair/, /Eye/, /Teeth/, /Glasses/, /Bottom/, /Footwear/],
};

// let model = "onesie";
// let avatar = modelMap["onesie"].avatar;
let topRenderer, bottomRenderer;
async function main() {

// let camDevice = await navigator.mediaDevices.enumerateDevices()
// console.log(camDevice)
// camDevice = camDevice.filter((device) => device.label === "OBS Virtual Camera")
// console.log(camDevice[0])
// if (camDevice.length === 0) {
//   camDevice = await navigator.mediaDevices.enumerateDevices()
//   camDevice = camDevice.filter((device) => device.kind === "videoinput")
//   console.log(camDevice)
// }

  // Renderer
  const container = document.getElementById("tryOn");
  if (!container) return;

  topRenderer = new AvatarRenderer(
    container,
    "crop",
    !rear,
    "avatars/TwinverseTee.glb",
    topOutfit
  );

  // bottomRenderer = new AvatarRenderer(
  //   container,
  //   "crop",
  //   !rear,
  //   "avatars/1.glb",
  //   bottomOutfit
  // );

  /*
  // Camera switch
  const cameraSwitch = document.getElementById(
    "camera-switch"
  )
  if (cameraSwitch) {
    cameraSwitch.onclick = async () => {
      cameraSwitch.disabled = true;
      rear = !rear;
      await engine.setup({
        video: {
          deviceId:
            "f865c1d1b63c6af504b18379b6bac94e8d0ae84b9608643ea27dc5f051c1b279",
        },
      });
      await engine.start();
      renderer.setMirror(!rear);
      cameraSwitch.disabled = false;
    };
  }
  */

  /*
  // Outfit switch
  const outfitSwitch = document.getElementById(
    "outfit-switch"
  )
  outfitSwitch.checked = avatar;
  outfitSwitch.onchange = async () => {
    modelBtns.forEach((btn) => {
      btn.disabled = true;
    });
    outfitSwitch.disabled = true;
    const spinner = createSpinner();
    document.body.appendChild(spinner);
    avatar = outfitSwitch.checked;
    await renderer.setOutfit(
      modelMap[model].file,
      avatar ? undefined : modelMap[model].outfit,
      "Hi"
    );

    document.body.removeChild(spinner);
    modelBtns.forEach((btn) => {
      btn.disabled = false;
    });

    outfitSwitch.disabled = false;
  };
*/

  // Recorder
  // const safari =
  //   navigator.userAgent.indexOf("Safari") > -1 &&
  //   navigator.userAgent.indexOf("Chrome") <= -1;
  // const ext = safari ? "mp4" : "webm";
  // const recorder = new Recorder(topRenderer, "video/" + ext);
  // const recordButton = document.getElementById("record");
  // if (recordButton)
  //   recordButton.onclick = () => {
  //     recorder?.start();
  //     setTimeout(async () => {
  //       const blob = await recorder?.stop();
  //       if (!blob) return;
  //       const url = URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.hidden = true;
  //       link.href = url;
  //       link.download = "capture." + ext;
  //       link.click();
  //       link.remove();
  //       URL.revokeObjectURL(url);
  //     }, 30000);
  //   };

  /*
  // Model carousel
  const modelBtns = document.getElementsByName("model");
  modelBtns.forEach((btn) => {
    btn.onchange = async () => {
      if (btn.checked && modelMap[btn.value]) {
        modelBtns.forEach((btn) => {
          btn.disabled = true;
        });
        outfitSwitch.disabled = true;
        const spinner = createSpinner();
        document.body.appendChild(spinner);
        model = btn.value;
        avatar = modelMap[model].avatar;
        await renderer.setOutfit(
          modelMap[model].file,
          avatar ? undefined : modelMap[model].outfit,
          false
        );
        outfitSwitch.checked = avatar;
        document.body.removeChild(spinner);
        modelBtns.forEach((btn) => {
          btn.disabled = false;
        });
        outfitSwitch.disabled = false;
      }
    };
  });

  */

  // Initialization
  await Promise.all([
    // engine.addRenderer(bottomRenderer),
    engine.addRenderer(topRenderer),
    engine.init({ token: token }),
  ]);


  // await engine.setup({
  //   video: {
  //     deviceId:
  //       camDevice[0].deviceId
  //       // "f865c1d1b63c6af504b18379b6bac94e8d0ae84b9608643ea27dc5f051c1b279",
  //   },
  // });

  await engine.setup()

  await engine.start();
  let refresh = fetch("http://127.0.0.1:8000/refresh")
  console.log("Done Loading")

  // document.getElementById("dots")?.remove();
}

function App() {
  const [count, setCount] = useState(0);

  // let bottomChoices = [];
  // let topChoices = [];

  // const settings = {
  //   // dots: true,
  //   // focusOnSelect:true,
  //   infinite: true,
  //   speed: 500,
  //   autoplay: true,
  //   autoplaySpeed: 15000,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   vertical: true,
  //   verticalSwiping: true,
  //   afterChange: function (currentSlide) {
  //     console.log("after change", currentSlide);
  //     // console.log(topChoices);
  //     let cloth = topChoices[(currentSlide + 1) % topChoices.length];
  //     // console.log(cloth);
  //     topRenderer.setOutfit("avatars/" + cloth+".glb", topOutfit, false);
  //   },
  // };

  // for (let i = 1; i < 11; i++) {
  //   let bottomDef = {
  //     name: "name",
  //     img: "img",
  //     url: "url",
  //   };
  //   let topDef = {
  //     name: "name",
  //     img: "img",
  //     url: "url",
  //   };
  //   bottomDef.name = "nameBottom" + i;
  //   bottomDef.img = "imgBottom" + i;
  //   bottomDef.url = i + ".glb";
  //   bottomChoices.push(bottomDef);

  //   topDef.name = "nameTop" + i;
  //   topDef.img = i + ".png";
  //   topDef.url = i + ".glb";
  //   topChoices.push(topDef);
  // }

  // topChoices = ["AngelOfDeathTee","BasicBlueTee","BasicPurpleTee","BasicWhiteTee","BirdTee","BreakBarriersTee","CyberSigilismTee","DragonTee","EmbroideryTee","FishTee"]

  useEffect(() => {
    main();
  });

  return (
    <>
      <div id="tryOn" className="z-0 h-screen w-screen"></div>
      <div id="ui" className="z-1 h-0">
        <div id="logoBar" className="fixed top-0 w-[100vw] h-[20vw]">
          {/* <img src="nudeLogo.png" className="fixed right-5 top-5 h-[10vw]" /> */}
          <img src="twinLogo.png" className="fixed left-5 top-5 w-[40vw]" />
        </div>
        {
        // <Button id="record" className="fixed right-10 top-10 invisible">
        //   Record
        // </Button>
        // <div className="fixed right-0 top-1/2 flex flex-col -translate-y-1/2 z-1">
        //   <Slider {...settings} className="w-[18vw]">
        //     {topChoices.map((top, index) => {
        //       // console.log(top)
        //       return (
        //         <div
        //           key={index}
        //           onClick={() => {
        //             // console.log(top);
        //             // topRenderer.setOutfit("avatars/"+top.url, topOutfit, false);
        //           }}
        //         >
        //           <div className="flex flex-col m-6">
        //             <img
        //               src={"avatarPreview/" + top+".png"}
        //               className="w-[15vw] h-[15vw] rounded-full border-black border-2"
        //             />
        //           </div>
        //         </div>
        //       );
        //     })}
        //   </Slider>
        //   {/* Onclick click topWearTrigger */}
        //   {/* <Button
        //     className="h-[6vh] text-[1.5vh] rounded-l-none"
        //     onClick={() => {
        //       document.getElementById("topwearTrigger").click();
        //     }}
        //   >
        //     Outfits
        //   </Button> */}
        //   {/* <Button
        //     className="h-[6vh] text-[1.5vh] rounded-l-none"
        //     onClick={() => {
        //       document.getElementById("bottomwearTrigger").click();
        //     }}
        //   >
        //     Bottomwear
        //   </Button> */}
        // </div>
        }
        {
          // <Sheet id="topwearSheet">
          //   <SheetTrigger id="topwearTrigger"></SheetTrigger>
          //   <SheetContent side={"left"}>
          //     <SheetHeader>
          //       <SheetTitle className="text-[3vh]">Select Outfit</SheetTitle>
          //       <SheetDescription>Choose Outfit to Try On!</SheetDescription>
          //     </SheetHeader>
          //     <Separator className="my-10" />
          //     <ScrollArea>
          //       <div className="flex flex-row flex-wrap justify-start gap-[2vw]">
          //         {topChoices.map((top, index) => {
          //           return (
          //             <div key={index} onClick={
          //               () => {
          //                 console.log(top);
          //                 topRenderer.setOutfit("avatars/"+top.url, topOutfit, false);
          //               }
          //             }>
          //               <div className="flex flex-col">
          //                 <img
          //                   src={"avatarPreview/"+top.img}
          //                   className="w-[15vw] h-[15vw] rounded-[1vh]"
          //                 />
          //                 {/* <div className="flex flex-col">
          //                   <div className="text-[1.5vh]">{bottom.name}</div>
          //                 </div> */}
          //               </div>
          //             </div>
          //           );
          //         })}
          //       </div>
          //     </ScrollArea>
          //   </SheetContent>
          // </Sheet>
        }
        {
          // <Sheet id="bottomwearSheet">
          //   <SheetTrigger id="bottomwearTrigger"></SheetTrigger>
          //   <SheetContent side={"left"}>
          //     <SheetHeader>
          //       <SheetTitle className="text-[3vh]">Select BottomWear</SheetTitle>
          //       <SheetDescription>Choose Bottomwear to Try On!</SheetDescription>
          //     </SheetHeader>
          //     <Separator className="my-10" />
          //     <ScrollArea>
          //       <div className="flex flex-row flex-wrap justify-start gap-[2vw]">
          //         {bottomChoices.map((bottom, index) => {
          //           return (
          //             <div key={index} onClick={
          //               () => {
          //                 console.log(bottom);
          //                 bottomRenderer.setOutfit("avatars/"+bottom.url, bottomOutfit, false);
          //               }
          //             }>
          //               <div className="flex flex-col">
          //                 <img
          //                   src={bottom.img}
          //                   className="w-[15vw] h-[15vw] rounded-[1vh]"
          //                 />
          //                 {/* <div className="flex flex-col">
          //                   <div className="text-[1.5vh]">{bottom.name}</div>
          //                 </div> */}
          //               </div>
          //             </div>
          //           );
          //         })}
          //       </div>
          //     </ScrollArea>
          //   </SheetContent>
          // </Sheet>
        }
      </div>
    </>
  );
}

export default App;
