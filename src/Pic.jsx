import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

import "./Pic.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
import html2canvas from "html2canvas";

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 0, 0, 0.1)"
            : "rgb(255 132 132 / 25%)",
      }}
    />
  );
}

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "84px 15px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "rgb(197 191 191)",
  color: "white",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function StyledDropzone(props) {
  const [yourImage, setImage] = useState([]);
  const [BG, setBg] = useState([]);
  const [padding, setPadding] = useState();
  const [marginTop, setMarginTop] = useState("12px");
  const [marginLeft, setMarginLeft] = useState("12px");
  const [width, setWidth] = useState("900px");
  const [height, setHeight] = useState("860px");
  const [borderWidth, setBorderWidth] = useState("12px");
  const [backgroundColor, setBackgroundColor] = useState("darkslategrey");
  const [backgroundURL, setBackgroundURL] = useState();
  const [background, setBackground] = useState();
  const [borderRadius, setBorderRadius] = useState("2px");

  const [style1, setStyle1] = useState(false);
  const [style2, setStyle2] = useState(false);
  const [style3, setStyle3] = useState(false);

  const uploadBG = () => {
    setBackground(true);
    setStyle1(false);
    setStyle2(false);
    setStyle3(false);
  };

  const exportPDF = () => {
    const input = document.getElementById("pic");

    html2canvas(input, {}).then((canvas) => {
      console.log(canvas);
      canvas.style.display = "none";
      var image = canvas.toDataURL("png");
      var a = document.createElement("a");
      a.setAttribute("download", "myImage.png");
      a.setAttribute("href", image);
      a.click();
    });

    console.log(input);
  };

  let styling = {
    padding: padding,
    width: width,
    height: height,
    marginTop: marginTop,
    marginBottom: marginTop,
    marginLeft: marginLeft,
    marginRight: marginLeft,
    borderWidth: borderWidth,
    borderRadius: borderRadius,
    boxShadow: "-4px 10px 26px 0px rgba(133,80,80,0.57)",
  };

  let divStyle = {
    backgroundColor: backgroundColor,
    display: "inline-block",
    margin: "25px 0",
    backgroundImage:
      "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
  };

  let divStyle1 = {
    backgroundColor: backgroundColor,
    display: "inline-block",
    margin: "30px 0",
    backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
  };

  let divStyle2 = {
    backgroundColor: backgroundColor,
    display: "inline-block",
    margin: "35px 0",
    backgroundImage:
      "linear-gradient( 102.4deg,  rgba(253,189,85,1) 7.8%, rgba(249,131,255,1) 100.3% )",
  };

  let settingStyle1 = () => {
    setBackground(false);
    setStyle1(true);
    setStyle2(false);
    setStyle3(false);
  };

  let settingStyle2 = () => {
    setBackground(false);

    setStyle1(false);
    setStyle2(true);
    setStyle3(false);
  };
  let settingStyle3 = () => {
    setBackground(false);

    setStyle1(false);
    setStyle2(false);
    setStyle3(true);
  };

  let linearGradient = () => {
    // prompt({
    //   title: "Sign in to iTunes Store",
    //   message: 'Enter the Apple ID password for "hello@mobiscroll.com".',
    //   placeholder: "Password",
    //   inputType: "password",
    // });
  };

  const image = useDropzone({
    type: "file",
    accept: "image/*",
    description: "Images",
    maxFiles: 1,

    onDrop: (acceptedFiles, event) => {
      console.log(">>>>>>", event);

      setImage(
        acceptedFiles.map((upFile) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
    },
  });

  /////////////BG///////////////
  const bg = useDropzone({
    type: "file",
    accept: "image/*",
    description: "Images",
    maxFiles: 1,

    onDrop: (acceptedFiles, event) => {
      console.log(">>>>>>", event);
      setBg(
        acceptedFiles.map((upFile) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
    },
  });

  ///////////////////IMAGE ////////////////////////
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(image.isFocused ? focusedStyle : {}),
      ...(image.isDragAccept ? acceptStyle : {}),
      ...(image.isDragReject ? rejectStyle : {}),
    }),
    [image.isFocused, image.isDragAccept, image.isDragReject]
  );
  const style4 = useMemo(
    () => ({
      ...baseStyle,
      ...(bg.isFocused ? focusedStyle : {}),
      ...(bg.isDragAccept ? acceptStyle : {}),
      ...(bg.isDragReject ? rejectStyle : {}),
    }),
    [bg.isFocused, bg.isDragAccept, bg.isDragReject]
  );

  return (
    <div className="container">
      <h1>Picture Designer</h1>
      <div {...image.getRootProps({ style })}>
        <input
          type="file"
          accept="image/*"
          {...image.getInputProps()}
          id="first"
        />
        <p style={{ cursor: "crosshair" }}>
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>

      <div>
        {console.log("This is image", yourImage[0])}

        {console.log("This is bg ", bg[0])}

        {yourImage.map((upfile) => {
          console.log("This is image", yourImage);
          console.log("This is bg", BG);
          return (
            <div
              id="pic"
              key={upfile.index}
              style={
                style1
                  ? divStyle
                  : style2
                  ? divStyle1
                  : style3
                  ? divStyle2
                  : background
                  ? {
                      backgroundImage: `url(${BG[0]?.preview})`,

                      display: "inline-block",

                      marginTop: styling.marginTop,
                      marginBottom: styling.marginTop,
                      marginLeft: styling.marginLeft,
                      marginRight: styling.marginLeft,
                      borderWidth: styling.borderWidth,
                    }
                  : null
              }
            >
              <img style={styling} src={upfile.preview} alt="" />
            </div>
          );
        })}
      </div>
      <div className="downloadBtn">
        <Button variant="contained" color="error" onClick={() => exportPDF()}>
          Download!!
        </Button>
      </div>

      <div className="imgDesigns">
        <h2 className="selectDesigns" onClick={() => settingStyle1()}>
          1
        </h2>
        <h2 className="selectDesigns" onClick={() => settingStyle2()}>
          2
        </h2>
        <h2 className="selectDesigns" onClick={() => settingStyle3()}>
          3
        </h2>
        <h2 className="selectDesigns" onClick={() => linearGradient()}>
          Linear Gredient
        </h2>
      </div>
      <div {...bg.getRootProps({ style4 })}>
        <input type="file" accept="image/*" {...bg.getInputProps()} />
        <p className="bgUpload" onClick={() => uploadBG()}>
          Upload Background
        </p>
      </div>
      <div></div>

      <h1>Linear Gradient</h1>

      <div className="linearGradient">
        <TextField
          id="standard-helperText"
          label="degree"
          helperText="Enter degree of linear"
          variant="standard"
        />
        <TextField
          id="standard-helperText"
          label="Color 1"
          helperText="Enter any color"
          variant="standard"
        />
        <TextField
          id="standard-helperText"
          label="Color 2"
          helperText="Enter any color"
          variant="standard"
        />
        <TextField
          id="standard-helperText"
          label="Color 3"
          helperText="Enter any color"
          variant="standard"
        />
      </div>

      <h1>Settings</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root": { width: "55ch", margin: "auto" },
        }}
      >
        <RedBar style={{ backgroundColor: "rgb(88 88 88 / 10%)" }} />
        <TextField
          label={"margin-top-bottom"}
          id="margin-none"
          type="number"
          onChange={(e) => setMarginTop(e.target.value + "px")}
        />
        <RedBar />
        <TextField
          label={"margin-left-right"}
          id="margin-none"
          type="number"
          onChange={(e) => setMarginLeft(e.target.value + "px")}
        />
        <RedBar />

        <TextField
          label={"height"}
          id="margin-normal"
          margin="normal"
          type="number"
          onChange={(e) => setHeight(e.target.value + "px")}
        />
        <RedBar />
        <TextField
          label={"width"}
          id="margin-normal"
          margin="normal"
          type="number"
          onChange={(e) => setWidth(e.target.value + "px")}
        />
        <RedBar />
        <TextField
          label={"border-radius"}
          id="margin-normal"
          margin="normal"
          type="number"
          onChange={(e) => setBorderRadius(e.target.value + "px")}
        />
        <RedBar />
        <TextField
          label={"padding"}
          id="margin-normal"
          margin="normal"
          type="number"
          onChange={(e) => setPadding(e.target.value + "px")}
        />
        <RedBar />
      </Box>
    </div>
  );
}

<StyledDropzone />;
