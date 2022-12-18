// Polar Perlin Noise Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/136-polar-perlin-noise-loops.html
// https://youtu.be/ZI1dmHv3MeM
// https://editor.p5js.org/codingtrain/sketches/sy1p1vnQn

let form = document.getElementById('form');
let canvasContainer = document.getElementById('canvasContainer');
let strainNameX = document.getElementById('strainName');
let strainTypeX = document.getElementById('strainType');
let gradient = document.getElementById('gradient');

let sName;
let sType;
let sTHC;

let textInput;
let textInputLabel;

let strainRadio;
let strainRadioLabel;

let noiseMaxSlider;
let noiseMaxLabel;
let multiplier;

let innerSlider;
let innerSliderLabel;

let outerSlider;
let outerSliderLabel;

let THCSlider;
let TCHSliderLabel;

// colors
let indica = 'linear-gradient(rgb(194, 194, 194), 60%, rgb(22, 170, 255))';
let hybrid = 'linear-gradient(rgb(194, 194, 194), 60%, rgb(162, 22, 255))';
let sativa = 'linear-gradient(rgb(194, 194, 194), 60%, rgb(255, 14, 227))';

let noiseMax = 2;
// noiseMax = .5;

let phase = 0;
let zoff = 0;

function setup() {
  let cnv = createCanvas(1000, 1000).style("-webkit-filter", `url("#svgfilter")`).style("filter", `url("#svgfilter")`);
  cnv.parent(canvasContainer);
  // cnv.position(-400, -400);
  // cnv.position(-400, -200);
  cnv.position(-500, -200);
  cnv.position(-500, -300);

  // ///// TEXT INPUT ////// //
  textInput = createInput();
  textInput.attribute('placeholder', 'Purple Haze');
  textInput.parent(form);

  textInputLabel = createDiv('Enter strain name');
  textInputLabel.addClass('text-input-label');
  textInputLabel.parent(form);

  sName = createElement('h2', 'purple haze');
  sName.parent(strainNameX);

  // ///// RADIO INPUT ////// //
  strainRadio = createRadio();
  strainRadio.id('strainRadio');
  strainRadio.option('Indica', 'Indica');
  strainRadio.option('Hybrid', 'Hybrid');
  strainRadio.option('Sativa', 'Sativa');
  strainRadio.selected('Hybrid');
  strainRadio.parent(form);

  strainRadioLabel = createDiv('Select strain type');
  strainRadioLabel.parent(form);

  sType = createElement('h3', 'Strain: Hybrid');
  sType.parent(strainTypeX);

  //  ////// NOISE MAX INPUT ///// //

  noiseMaxSlider = createSlider(0, 10, 5, 0.1);
  // noiseMaxSlider = createSlider(0, 20, 3, 0.1);
  noiseMaxSlider.input(showNoiseMaxValue);
  noiseMaxSlider.parent(form);

  // noiseMaxLabel = createDiv('noiseMax Slider');
  // noiseMaxLabel.parent(form);

  noiseMaxLabelContainer = createDiv();
  noiseMaxLabelContainer.id('noisemaxLabelContainer');
  noiseMaxLabelLeft = createDiv('Relaxing');
  noiseMaxLabelCenter = createDiv('');
  noiseMaxLabelRight = createDiv('Energizing');
  noiseMaxLabelLeft.parent(noiseMaxLabelContainer);
  noiseMaxLabelCenter.parent(noiseMaxLabelContainer);
  noiseMaxLabelRight.parent(noiseMaxLabelContainer);
  noiseMaxLabelContainer.parent(form);

  //  ////// INNER INPUT ///// //
  // innerSlider = createSlider(50, 300, 100);
  // innerSlider.parent(form);
  // innerSlider.input(showInnerValue);

  // innerSliderLabel = createDiv('inner Radius Slider');
  // innerSliderLabel.parent(form);
  //  ////// OUTER INPUT ///// //
  // outerSlider = createSlider(200, 400, 200);
  // outerSlider.attribute('value', '200');
  // outerSlider.id('outerSlider');
  // outerSlider.parent(form);
  // outerSlider.input(showOuterValue);

  // outerSliderLabel = createDiv('outer Radius Slider');
  // outerSliderLabel.parent(form);

  sTHC = createElement('h3', 'THC: 26.5%');
  sTHC.parent(strainTypeX);

  THCSlider = createSlider(0, 130, 65);
  THCSlider.parent(form);
  THCSlider.input(calcTHC);

  THCSliderLabel = createDiv('THC Slider');
  THCSliderLabel.parent(form);

  background(0);

  startStop();
}

function showNoiseMaxValue(e) {
  let noiseMaxValue = noiseMaxSlider.value();
  let xmultiplier = map(noiseMaxValue, 0, 10, 0, 2);

  // noiseMaxLabel.html(`noiseMax Slider: ${noiseMaxValue} with multiplier: ${noiseMaxValue * xmultiplier}` );
  // print(`noiseMax Slider: ${noiseMaxValue} with multiplier: ${noiseMaxValue * xmultiplier}`);
  print(`noiseMax Slider: ${noiseMaxValue}`);

  let target = e.target;
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min;
  const max = target.max;
  const val = target.value;
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

function showInnerValue(e) {
  // let innerValue = innerSlider.value();
  // innerSliderLabel.html(`Inner Radius Slider: ${innerValue}`);

  let target = e.target;
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min;
  const max = target.max;
  const val = target.value;
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

function showOuterValue(e) {
  // let outerValue = outerSlider.value();
  // outerSliderLabel.html(`Outer Radius Slider: ${outerValue / 10}`);

  let target = e.target;
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min;
  const max = target.max;
  const val = target.value;
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

function calcTHC(e) {
  let THCValue = THCSlider.value();
  // THCSliderLabel.html(`THC Slider: ${map(THCValue, 0, 130, 24.0, 35.0).toFixed(1)}`);
  // THCSliderLabel.html(`THC Slider: ${map(THCValue, 0, 130, 20.0, 35.0).toFixed(1)}`);

  print(`THC Slider: ${map(THCValue, 0, 130, 20.0, 35.0).toFixed(1)}`);

  let target = e.target;
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min;
  const max = target.max;
  const val = target.value;
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

function draw() {

  translate(width / 2, height / 2);
  stroke(255, 255, 255, 10);
  stroke(255, 200, 200, 10);
  strokeWeight(1);
  noFill();
  beginShape();

  noiseMax = noiseMaxSlider.value();

  multiplier = map(noiseMax, 0, 10, 0, 2);

  innerRadius = (200 - THCSlider.value()) * 1.5;
  outerRadius = (250 + THCSlider.value()) * 1.5;

  for (let a = 0; a < TWO_PI; a+=.01) {
    let xoff = map(cos(a), -1, 1, 0, noiseMax * multiplier);
    let yoff = map(sin(a), -1, 1, 0, noiseMax * multiplier);

    // less noise:
    // let r = map(noise(xoff, yoff, zoff), 0, 1, 100, 200);
    let r = map(noise(xoff, yoff, zoff), 0, 1, innerRadius, outerRadius);

    // for more noise:
    // let r = map(noise(xoff, yoff, zoff), 0, 1, 50, 250);

    // max size:
    // let r = map(noise(xoff, yoff, zoff), 0, 1, 300, 400);

    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);

  zoff += 0.02;

  print(frameCount);
  let fc = frameCount;
  // if (fc%600 === 0) {
  if (fc%1000 === 0) {
    noLoop();
  }
}

function startStop() {
  noLoop();
  let buttonStart = createButton("generate");
  // let buttonStop = createButton("stop sketch");
  let buttonClear = createButton("clear");

  buttonStart.parent(form);
  // buttonStop.parent(form);
  buttonClear.parent(form);
  
  buttonStart.mousePressed(startSketch);
  // buttonStop.mousePressed(stopSketch);
  buttonClear.mousePressed(clear);
  
  function startSketch() {
    loop();

    // Print Name
    print(textInput.value());
    let nameText = textInput.value();
    sName.html(nameText);
    textInput.value('');

    // Print Strain
    let strainVal = strainRadio.value();
    sType.html(`Strain: ${strainVal}`);

    // Print THC
    let THCVal = map(THCSlider.value(), 0, 130, 20.0, 35.0).toFixed(1);
    sTHC.html(`THC: ${THCVal}%`);

    // Select Gradient Color
    if (strainVal === 'Indica') {
      gradient.style.background = indica;
    }
    if (strainVal === 'Hybrid') {
      gradient.style.background = hybrid;
    }
    if (strainVal === 'Sativa') {
      gradient.style.background = sativa;
    }
  }

  // function stopSketch() {
  //   noLoop();
  // }

  function clear() {
    location.reload();
  }
}