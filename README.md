# WebGL Convolution Shaders Demo
I put together this tiny demo to show the following:
* A collection of convolution-based image processing shaders.
* WebGL used as a powerful *rasterization API* rather than a full-blown *3D library,* for which I'd recommend using [three.js](http://threejs.org/).
* A class that sets up a WebGL context and processes content from a 2D buffer canvas using a render loop that continuously passes textures as well as a shader parameter.
* How to load shaders from an external file using ES6 template literals, creating and destroying shader programs without creating memory leaks.

Please note this makes use of both [React.js](https://github.com/facebook/react) and my own [spriteAnimation.js](https://github.com/Sophia-Gold/spriteAnimation.js).

---
Fragment shaders include:

+ box blur
+ radial blur
+ dilation
+ erosion
+ median filter
+ sharpen
+ emboss (Sobel filter)
+ Laplace filter

---

I hope might be helpful for some people learning WebGL!

**Example of all the shaders running can be seen [here](http://sretaeper.ucoz.com/shader_demo/index.html).**
