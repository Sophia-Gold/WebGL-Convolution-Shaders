////////////////VERTEX SHADERS////////////////

var passthruVertexShaderSrc = `
    precision mediump float;
    
    attribute vec2 position;
    attribute vec2 texcoord;
    
    uniform vec2 resolution;

    varying vec2 v_texcoord;

    void main() {
        gl_Position = vec4(((position / resolution) * 2.0 - 1.0) * vec2(1.0, -1.0), 0.0, 1.0);

        v_texcoord = texcoord;} `;

var box8VertexShaderSrc = `
    precision mediump float;
    
    attribute vec2 position;
    attribute vec2 texcoord;
    
    uniform vec2 resolution;
    uniform float width;

    varying vec2 texcoord00;
    varying vec2 texcoord01;
    varying vec2 texcoord02;
    varying vec2 texcoord10;
    varying vec2 texcoord12;
    varying vec2 texcoord20;
    varying vec2 texcoord21;
    varying vec2 texcoord22;

    void main() {
        gl_Position = vec4(((position / resolution) * 2.0 - 1.0) * vec2(1.0, -1.0), 0.0, 1.0);
    
        texcoord00 = texcoord + vec2(-width, -width);
        texcoord01 = texcoord + vec2( 0,       -width);
        texcoord02 = texcoord + vec2( width, -width);
        texcoord10 = texcoord + vec2(-width,  0);
        texcoord12 = texcoord + vec2( width,  0);
        texcoord20 = texcoord + vec2(-width,  width);
        texcoord21 = texcoord + vec2( 0,        width);
        texcoord22 = texcoord + vec2( width,  width);} `;

var diag5VertexShaderSrc = `
    precision mediump float;
    
    attribute vec2 position;
    attribute vec2 texcoord;
    
    uniform vec2 resolution;
    uniform float width;

    varying vec2 texcoord11;
    varying vec2 texcoord00;
    varying vec2 texcoord02;
    varying vec2 texcoord20;
    varying vec2 texcoord22;

    void main() {
        gl_Position = vec4(((position / resolution) * 2.0 - 1.0) * vec2(1.0, -1.0), 0.0, 1.0);

        texcoord11 = texcoord;
        texcoord00 = texcoord + vec2(-width, -width);
        texcoord02 = texcoord + vec2( width, -width);
        texcoord20 = texcoord + vec2( width,  width);
        texcoord22 = texcoord + vec2(-width,  width);} `;

var cross5VertexShaderSrc = `
    precision mediump float;
    
    attribute vec2 position;
    attribute vec2 texcoord;
    
    uniform vec2 resolution;
    uniform float width;

    varying vec2 texcoord01;
    varying vec2 texcoord10;
    varying vec2 texcoord11;
    varying vec2 texcoord12;
    varying vec2 texcoord21;

    void main() {
        gl_Position = vec4(((position / resolution) * 2.0 - 1.0) * vec2(1.0, -1.0), 0.0, 1.0);

        texcoord01 = texcoord + vec2(0, -width);
        texcoord10 = texcoord + vec2(-width, 0);
        texcoord11 = texcoord;
        texcoord12 = texcoord + vec2(width, 0);
        texcoord21 = texcoord + vec2(0, width);} `;

var embossVertexShaderSrc = `
    precision mediump float;
    
    attribute vec2 position;
    attribute vec2 texcoord;
    
    uniform vec2 resolution;
    uniform float width;

    varying vec2 texcoord00;
    varying vec2 texcoord01;
    varying vec2 texcoord02;
    varying vec2 texcoord10;
    varying vec2 texcoord12;
    varying vec2 texcoord20;
    varying vec2 texcoord21;
    varying vec2 texcoord22;

    void main() {
        gl_Position = vec4(((position / resolution) * 2.0 - 1.0) * vec2(1.0, -1.0), 0.0, 1.0);
        
        texcoord00 = texcoord + vec2(-width - 0.01, -width - 0.01);
        texcoord01 = texcoord + vec2( 0, -width - 0.01);
        texcoord02 = texcoord + vec2( width + 0.01, -width - 0.01);
        texcoord10 = texcoord + vec2(-width - 0.01,  0);
        texcoord12 = texcoord + vec2( width + 0.01,  0);
        texcoord20 = texcoord + vec2(-width - 0.01,  width + 0.01);
        texcoord21 = texcoord + vec2( 0, width + 0.01);
        texcoord22 = texcoord + vec2( width + 0.01,  width + 0.01);} `;

var laplaceVertexShaderSrc = `
    precision mediump float;
    
    attribute vec2 position;
    attribute vec2 texcoord;
    
    uniform vec2 resolution;
    uniform float width;

    varying vec2 texcoord01;
    varying vec2 texcoord10;
    varying vec2 texcoord11;
    varying vec2 texcoord12;
    varying vec2 texcoord21;

    void main() {
        gl_Position = vec4(((position / resolution) * 2.0 - 1.0) * vec2(1.0, -1.0), 0.0, 1.0);

        texcoord01 = texcoord + vec2(0, -width - 0.01);
        texcoord10 = texcoord + vec2(-width - 0.01, 0);
        texcoord11 = texcoord;
        texcoord12 = texcoord + vec2(width + 0.01, 0);
        texcoord21 = texcoord + vec2(0, width + 0.01);} `;

var medianVertexShaderSrc = `
    precision mediump float;
    attribute vec2 position;
    attribute vec2 texcoord;

    uniform vec2 resolution;
    uniform float width;

    varying vec2 texcoord0;
    varying vec2 texcoord1;
    varying vec2 texcoord2;

    void main() {
        gl_Position = vec4(((position / resolution) * 2.0 - 1.0) * vec2(1.0, -1.0), 0.0, 1.0);

	   texcoord0 = texcoord;
	   texcoord1 = texcoord - width;
	   texcoord2 = texcoord + width;} `;

////////////////FRAGMENT SHADERS////////////////

var blurFragmentShaderSrc = ` 
    precision mediump float;

    uniform sampler2D image;

    varying vec2 texcoord11;
    varying vec2 texcoord00;
    varying vec2 texcoord02;
    varying vec2 texcoord20;
    varying vec2 texcoord22;

    void main() {
	   vec4 blur;
	
	   blur = texture2D(image, texcoord11);
	   blur += texture2D(image, texcoord00);
	   blur += texture2D(image, texcoord02);
	   blur += texture2D(image, texcoord20);
	   blur += texture2D(image, texcoord22);

	   gl_FragColor = 0.2 * blur;} `;

var dilateFragmentShaderSrc = ` 
    precision mediump float;

    uniform sampler2D image;

    varying vec2 texcoord00;
    varying vec2 texcoord01;
    varying vec2 texcoord02;
    varying vec2 texcoord10;
    varying vec2 texcoord12;
    varying vec2 texcoord20;
    varying vec2 texcoord21;
    varying vec2 texcoord22;

    void main() {
	   vec4 dilate = texture2D(image, 0.5 * (texcoord10 + texcoord12));
	
	   dilate = max(dilate, texture2D(image, texcoord00));
	   dilate = max(dilate, texture2D(image, texcoord01));
	   dilate = max(dilate, texture2D(image, texcoord02));
	   dilate = max(dilate, texture2D(image, texcoord10));
	   dilate = max(dilate, texture2D(image, texcoord12));
	   dilate = max(dilate, texture2D(image, texcoord20));
	   dilate = max(dilate, texture2D(image, texcoord21));
	   dilate = max(dilate, texture2D(image, texcoord22));

	   gl_FragColor = dilate;} `;

var embossFragmentShaderSrc = `
    precision mediump float;

    uniform sampler2D image;
    uniform vec4 offset;

    varying vec2 texcoord00;
    varying vec2 texcoord01;
    varying vec2 texcoord02;
    varying vec2 texcoord10;
    varying vec2 texcoord12;
    varying vec2 texcoord20;
    varying vec2 texcoord21;
    varying vec2 texcoord22;

    void main() {
	   vec4 emboss = texture2D(image, texcoord00);
	
	   emboss += texture2D(image, texcoord01);
	   emboss += texture2D(image, texcoord10);
	   emboss -= texture2D(image, texcoord12);
	   emboss -= texture2D(image, texcoord21);
	   emboss -= texture2D(image, texcoord22);

	   gl_FragColor = emboss + offset;} `;

var erodeFragmentShaderSrc = `
    precision mediump float; 

    uniform sampler2D image;

    varying vec2 texcoord00;
    varying vec2 texcoord01;
    varying vec2 texcoord02;
    varying vec2 texcoord10;
    varying vec2 texcoord12;
    varying vec2 texcoord20;
    varying vec2 texcoord21;
    varying vec2 texcoord22;

    void main() {
	   vec4 erode = texture2D(image, 0.5 * (texcoord10 + texcoord12));
	
	   erode = min(erode, texture2D(image, texcoord00));
	   erode = min(erode, texture2D(image, texcoord01));
	   erode = min(erode, texture2D(image, texcoord02));
	   erode = min(erode, texture2D(image, texcoord10));
	   erode = min(erode, texture2D(image, texcoord12));
	   erode = min(erode, texture2D(image, texcoord20));
	   erode = min(erode, texture2D(image, texcoord21));
	   erode = min(erode, texture2D(image, texcoord22));

	   gl_FragColor = erode;} `;

var laplaceFragmentShaderSrc = ` 
    precision mediump float;

    uniform sampler2D image;
    uniform vec4 offset;

    varying vec2 texcoord01;
    varying vec2 texcoord10;
    varying vec2 texcoord11;
    varying vec2 texcoord12;
    varying vec2 texcoord21;

    void main() {
	   vec4 f01 = texture2D(image, texcoord01);
	   vec4 f10 = texture2D(image, texcoord10);
	   vec4 f11 = texture2D(image, texcoord11);
	   vec4 f12 = texture2D(image, texcoord12);
	   vec4 f21 = texture2D(image, texcoord21);

	   vec4 laplace = 4.0 * f11 - f01 - f10 - f12 - f21;

	   gl_FragColor = laplace + offset;} `;

var medianFragmentShaderSrc = `
    precision mediump float;

    uniform sampler2D image;

    varying vec2 texcoord0;
    varying vec2 texcoord1;
    varying vec2 texcoord2;

    void main() {	
        vec4 sample0 = texture2D(image, texcoord0);
        vec4 sample1 = texture2D(image, texcoord1);
        vec4 sample2 = texture2D(image, texcoord2);

        vec4 max0 = max(sample0, sample1);
        vec4 max1 = max(sample1, sample2);
        vec4 max2 = max(sample2, sample0);

        vec4 median = min(min(max0, max1), max2);

        gl_FragColor = median;} `;

var radialblurFragmentShaderSrc = `
    precision mediump float;

    uniform sampler2D tex0;
    uniform vec2 resolution;
    uniform float width;
    
    varying vec2 v_texcoord;

    void main() {
        
        vec2 orn = 0.0*resolution;
        vec2 dst = v_texcoord-orn;
        vec2 off = dst*width*-0.05;
    
        vec4 pr1 = texture2D(tex0,dst+orn);
        vec4 pr2 = texture2D(tex0,dst+off+orn);
        vec4 pr3 = texture2D(tex0,(dst+off*2.)+orn);
        vec4 pr4 = texture2D(tex0,(dst+off*3.)+orn);
        vec4 pr5 = texture2D(tex0,(dst+off*4.)+orn);
        vec4 pr6 = texture2D(tex0,(dst+off*5.)+orn);
        vec4 pr7 = texture2D(tex0,(dst+off*6.)+orn);
        vec4 pr8 = texture2D(tex0,(dst+off*7.)+orn);
        vec4 pr9 = texture2D(tex0,(dst+off*8.)+orn);
        
        vec4 avg9 = (pr1+pr2+pr3+pr4+pr5+pr6+pr7+pr8+pr9)/9.0;
	       
        gl_FragColor = avg9;} `;

var sharpenFragmentShaderSrc = ` 
    precision mediump float;

    uniform sampler2D image;

    varying vec2 texcoord11;
    varying vec2 texcoord00;
    varying vec2 texcoord02;
    varying vec2 texcoord20;
    varying vec2 texcoord22;

    void main() {	
        vec4 s11 = texture2D(image, texcoord11);
        vec4 s00 = texture2D(image, texcoord00);
        vec4 s02 = texture2D(image, texcoord02);
        vec4 s20 = texture2D(image, texcoord20);
        vec4 s22 = texture2D(image, texcoord22);
        
        vec4 sharp = 5.0 * s11 - (s00 + s02 + s20 + s22);

        gl_FragColor = sharp;} `;