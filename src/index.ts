type InputType =
  | [number]
  | [number, number | string]
  | [number, number | string, number | string];

class CbLoremImage {
  height = 0;
  width = 0;
  color = '';
  textColor = 'white';
  textScale = 20;
  corbie = { width: 0, height: 0 };
  defaultColor = '#778899';

  svg(...args: InputType): string {
    this.processArgs(...args);
    const svgXml = this.generateSvg();

    const svgBlob = new Blob([svgXml], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);

    return svgUrl;
  }
  svgAsXml(...args: InputType): string {
    this.processArgs(...args);
    const svgXml =
      '<?xml version="1.0" encoding="UTF-8"?>' + this.generateSvg();

    return svgXml;
  }

  processArgs(...args: InputType) {
    if (!args[1]) {
      //VALIDATE
      this.width = args[0];
      this.height = args[0];
      this.color = this.defaultColor;
    } else if (!args[2] && typeof args[1] === 'number') {
      //VALIDATE
      this.width = args[0];
      this.height = args[1];
      this.color = this.defaultColor;
    } else if (!args[2] && typeof args[1] === 'string') {
      //VALIDATE
      this.width = args[0];
      this.height = args[0];
      this.color = args[1];
    } else if (typeof args[1] === 'number' && typeof args[2] === 'string') {
      //VALIDATE
      this.width = args[0];
      this.height = args[1];
      this.color = args[2];
    }

    this.validateNumber(this.width);
    this.validateNumber(this.height);
    this.validateColor(this.color);
  }

  validateNumber = (value: number) => {
    if (
      isNaN(value) ||
      value <= 0 ||
      value > 3840 ||
      !Number.isInteger(value)
    ) {
      throw new Error(
        'Width and Height should be positive integers and maximum 3840.',
      );
    }
  };

  validateColor = (value: string) => {
    let err = 0;
    let errMsg = '';
    value = value.toString();
    value = value.replace(/^#/, '');
    if (value.length !== 6) {
      throw new Error('Wrong input format. Should be: (#)abcdef');
    } else if (!value.match(/[0-9A-Fa-f]{6}/g)) {
      throw new Error(
        'Wrong input format. Each item should be between 0 and f',
      );
    }
  };

  generateSvg(): string {
    if (this.color === 'random') {
      this.color = this.getRandomColor();
    } else if (!this.color.startsWith('#')) {
      this.color = '#' + this.color;
    }

    this.setTextColor();
    this.setTextScale();
    this.setCorbieDimension();

    let charDimesions = {
      x: 12,
      y: 15,
    };
    let upperLineChars = this.width.toString().split('');
    let lowerLineChars = this.height.toString().split('');
    let upperMargin =
      charDimesions.x * 0.5 * upperLineChars.length - charDimesions.x / 2;
    let lowerMargin =
      charDimesions.x * 0.5 * lowerLineChars.length - charDimesions.x / 2;
    let upperLine = '';
    let lowerLine = '';
    for (const [index, char] of Object.entries(upperLineChars)) {
      upperLine +=
        '<use href="#I' +
        char +
        '" x="' +
        charDimesions.x * Number.parseInt(index!) +
        '" />';
    }
    for (const [index, char] of Object.entries(lowerLineChars)) {
      lowerLine +=
        '<use href="#I' +
        char +
        '" x="' +
        charDimesions.x * Number.parseInt(index!) +
        '" />';
    }

    const svgXml = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}">
            <defs>
                <style>.char {fill: ${this.textColor};stroke: ${this.textColor};stroke-width: 0.5px;}</style>
                <path id="I0" class="char" d="m 6,0.24 c 2.84,0 4.58,-2.42 4.58,-6.66 C 10.58,-10.7 8.84,-13 6,-13 c -2.84,0 -4.58,2.3 -4.58,6.58 0,4.24 1.74,6.66 4.58,6.66 z m 0,-1.32 c -1.78,0 -3.04,-1.68 -3.04,-5.34 0,-3.68 1.26,-5.26 3.04,-5.26 1.78,0 3.04,1.58 3.04,5.26 0,3.66 -1.26,5.34 -3.04,5.34 z m 0,-4.14 c 0.66,0 1.24,-0.5 1.24,-1.34 0,-0.82 -0.58,-1.32 -1.24,-1.32 -0.66,0 -1.24,0.5 -1.24,1.32 0,0.84 0.58,1.34 1.24,1.34 z" />
                <path id="I1" class="char" d="M 1.94,0 H 10.6 V -1.36 H 7.26 v -11.4 H 6.04 c -0.82,0.44 -1.78,0.74 -3.28,0.94 v 1.06 h 2.86 v 9.4 H 1.94 Z" />
                <path id="I2" class="char" d="m 1.46,0 h 8.98 v -1.42 h -4.2 c -0.76,0 -1.58,0.06 -2.38,0.12 3.48,-3.16 5.88,-5.54 5.88,-7.94 0,-2.26 -1.6,-3.76 -4.16,-3.76 -1.8,0 -3.06,0.78 -4.2,1.94 l 0.94,0.94 c 0.82,-0.86 1.86,-1.54 3.06,-1.54 1.88,0 2.78,1.04 2.78,2.5 0,2.12 -2.38,4.36 -6.7,8.18 z" />
                <path id="I3" class="char" d="m 5.74,0.24 c 2.54,0 4.62,-1.38 4.62,-3.64 0,-1.76 -1.46,-2.88 -3.16,-3.24 V -6.72 C 8.78,-7.24 9.92,-8.22 9.92,-9.76 9.92,-11.82 8.1,-13 5.7,-13 c -1.64,0 -3.02,0.68 -4.08,1.6 l 0.88,1.04 c 0.84,-0.76 1.94,-1.3 3.14,-1.3 1.56,0 2.6,0.78 2.6,2.02 0,1.34 -1.16,2.38 -4.18,2.38 V -6 c 3.36,0 4.64,1.02 4.64,2.54 0,1.42 -1.32,2.34 -3.06,2.34 -1.64,0 -2.82,-0.72 -3.66,-1.52 l -0.84,1.08 c 0.94,0.94 2.4,1.8 4.6,1.8 z" />
                <path id="I4" class="char" d="M 2.6,-4.84 6.06,-9.2 c 0.42,-0.62 0.9,-1.24 1.3,-1.86 h 0.1 c -0.04,0.7 -0.08,1.56 -0.1,2.26 v 3.96 z M 7.36,0 H 8.92 V -3.52 H 10.9 V -4.84 H 8.92 v -7.92 H 7.16 l -6.38,8.14 v 1.1 h 6.58 z" />
                <path id="I5" class="char" d="m 5.72,0.24 c 2.44,0 4.72,-1.56 4.72,-4.32 0,-2.76 -1.94,-4 -4.38,-4 -0.98,0 -1.62,0.2 -2.36,0.52 l 0.34,-3.78 H 9.8 v -1.42 H 2.58 l -0.42,6.14 0.88,0.56 c 0.9,-0.5 1.54,-0.78 2.6,-0.78 1.9,0 3.14,1.04 3.14,2.8 0,1.78 -1.44,2.92 -3.24,2.92 -1.72,0 -2.76,-0.7 -3.6,-1.46 L 1.12,-1.5 c 0.98,0.88 2.32,1.74 4.6,1.74 z" />
                <path id="I6" class="char" d="m 6.4,-6.56 c 1.76,0 2.72,0.96 2.72,2.7 0,1.68 -1.18,2.8 -2.7,2.8 -1.86,0 -3.04,-1.32 -3.28,-3.78 1.02,-1.22 2.24,-1.72 3.26,-1.72 z m 0.02,6.8 c 2.28,0 4.26,-1.66 4.26,-4.1 0,-2.62 -1.62,-3.94 -3.98,-3.94 -1.28,0 -2.58,0.64 -3.62,1.66 0.08,-4.1 1.86,-5.48 3.9,-5.48 0.96,0 1.88,0.38 2.54,1 l 0.92,-1.02 C 9.6,-12.42 8.44,-13 6.88,-13 c -2.78,0 -5.34,1.98 -5.34,7.1 0,4.1 2.1,6.14 4.88,6.14 z" />
                <path id="I7" class="char" d="m 4.52,0 h 1.72 c 0.18,-5 1.02,-7.88 4.4,-11.74 v -1.02 H 1.4 v 1.42 H 8.76 C 5.84,-7.76 4.74,-4.84 4.52,0 Z" />
                <path id="I8" class="char" d="m 6.04,0.24 c 2.92,0 4.58,-1.5 4.58,-3.4 0,-1.82 -1.1,-2.62 -2.5,-3.32 v -0.08 c 1.06,-0.74 1.94,-1.84 1.94,-3.04 0,-1.98 -1.46,-3.4 -3.96,-3.4 -2.28,0 -3.94,1.32 -3.94,3.28 0,1.34 0.88,2.32 1.94,2.98 v 0.08 c -1.36,0.64 -2.74,1.64 -2.74,3.4 0,2.02 1.8,3.5 4.68,3.5 z m 1,-7.2 c -1.9,-0.6 -3.38,-1.24 -3.38,-2.76 0,-1.24 0.98,-2.06 2.4,-2.06 1.68,0 2.58,1 2.58,2.26 0,0.94 -0.56,1.8 -1.6,2.56 z m -0.96,5.98 c -1.96,0 -3.22,-1.02 -3.22,-2.44 0,-1.28 0.94,-2.1 2.18,-2.78 2.24,0.76 4,1.2 4,2.98 0,1.32 -1.06,2.24 -2.96,2.24 z" />                
                <path id="I9" class="char" d="m 2.9,-8.9 c 0,-1.68 1.18,-2.8 2.7,-2.8 1.88,0 3.02,1.32 3.28,3.8 -1.04,1.2 -2.26,1.7 -3.26,1.7 -1.78,0 -2.72,-0.96 -2.72,-2.7 z m 2.24,9.14 c 2.76,0 5.34,-1.98 5.34,-7.1 0,-4.1 -2.12,-6.14 -4.9,-6.14 -2.26,0 -4.24,1.66 -4.24,4.1 0,2.62 1.6,3.94 3.96,3.94 1.3,0 2.58,-0.62 3.62,-1.64 -0.08,4.08 -1.86,5.48 -3.88,5.48 -0.98,0 -1.9,-0.4 -2.54,-1.02 L 1.58,-1.1 c 0.84,0.76 2,1.34 3.56,1.34 z" />
                <path id="x" class="char" d="m 1.28,0 h 1.76 l 1.6,-2.24 c 0.4,-0.62 0.8,-1.18 1.2,-1.76 h 0.08 c 0.42,0.56 0.88,1.2 1.28,1.76 L 8.9,0 h 1.8 L 6.98,-4.9 10.44,-9.72 H 8.7 l -1.46,2.1 C 6.9,-7.08 6.5,-6.48 6.14,-5.94 H 6.06 C 5.66,-6.48 5.26,-7.06 4.92,-7.58 L 3.38,-9.72 H 1.56 l 3.42,4.68 z" />
            </defs>
            
            <rect width="${this.width}" height="${this.height}" fill="${this.color}" />

            <g transform="translate(${this.width / 2}, ${this.height / 2}) scale(${this.textScale})">
                <g transform="translate(-${charDimesions.x / 2 + upperMargin}, -${charDimesions.y * 0.65})">
                    ${upperLine}
                </g>
            </g>

            <g transform="translate(${this.width / 2}, ${this.height / 2}) scale(${this.textScale})">
                <use href="#x" x="-${charDimesions.x / 2}" y="${charDimesions.y * 0.325}" />
            </g>

            <g transform="translate(${this.width / 2}, ${this.height / 2}) scale(${this.textScale})">
                <g transform="translate(-${charDimesions.x / 2 + lowerMargin}, ${charDimesions.y * 1.5})">
                    ${lowerLine}
                </g>
            </g>

            <svg x='${Math.max(this.width * 0.9, this.width - 10) - this.corbie.width}' y='${Math.max(this.height * 0.9, this.height - 10) - this.corbie.height}' width='${this.corbie.width}' height='${this.corbie.height}' viewBox='0 0 550 640'><g stroke='#000' stroke-width='10'><g fill='#444'><circle cx='270' cy='370' r='250'/><circle cx='270' cy='220' r='200'/></g><g fill='#fff'><circle cx='195' cy='175' r='70'/><circle cx='345' cy='175' r='70'/></g></g><circle cx='195' cy='175' r='40'/><circle cx='345' cy='175' r='40'/><path d='m145 370c0-175 250-175 250 0l-125 250z' fill='#ffd801' stroke='#000' stroke-linejoin='round' stroke-width='10'/></svg>
        </svg>
        `;

    return svgXml.replace(/>\s*/g, '>').replace(/\s*</g, '<');
  }

  setTextColor() {
    let colorArray = this.hex2rgb(this.color) as [number, number, number];
    let o = Math.round(
      (colorArray[0] * 299 + colorArray[1] * 587 + colorArray[2] * 114) / 1000,
    );
    if (o > 125) {
      this.textColor = 'black';
    } else {
      this.textColor = 'white';
    }
  }

  setTextScale() {
    this.textScale = this.height / 100;
    if (this.textScale < 1) {
      //this.textScale = 1;
    }
    if (this.width / 80 < this.textScale) {
      this.textScale = this.width / 80;
    }
  }

  setCorbieDimension() {
    const basis = Math.min(this.width, this.height);
    let ratioDiff =
      Math.max(this.width, this.height) / Math.min(this.width, this.height);
    let width = 0.055 * basis * 3;
    if (ratioDiff > 7.5) {
      width = Math.min(this.width, this.height) * 0.5;
    }
    this.corbie = {
      width: width,
      height: (width / 55) * 64,
    };
  }

  getRandomColor(): string {
    const colors = [
      '#c0c0c0',
      '#808080',
      '#800000',
      '#ff0000',
      '#008000',
      '#808000',
      '#0000ff',
      '#008080',
    ];
    const randomIndex = Math.floor(Math.random() * 7);
    return colors[randomIndex] || this.defaultColor;
  }
  hex2rgb(hex: string) {
    let hexInt = parseInt(hex.slice(1), 16);
    let r = (hexInt >> 16) & 255;
    let g = (hexInt >> 8) & 255;
    let b = hexInt & 255;
    return [r, g, b];
  }
}

const cbLoremImage = new CbLoremImage();

export default cbLoremImage;
