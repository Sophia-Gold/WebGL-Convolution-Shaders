/*
Copyright (C) 2011-2016 by Sophia Gold
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

class CanvasSprite {
    
    constructor(canvas, width, height, sprite_url, rows, columns, total_frames) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.rows = rows;
        this.columns = columns;
        this.total_frames = total_frames;
        this.isDirty = true;

        var resolve;
        var canvasSpritePromise = new Promise(function (_resolve) {
            resolve = _resolve;
        });

        this.spritesheet = document.createElement('img');
        this.spritesheet.addEventListener('load', () => {
            this.sw = this.spritesheet.width / this.columns;
            this.sh = this.spritesheet.height / this.rows;
            this.setFrame(0);
            resolve(this);
        });
        this.spritesheet.src = sprite_url;
    
        return canvasSpritePromise;
    }
    
    draw() {  
        var column_frame = this.frame % this.columns;
        var sx = this.sw * column_frame;
        var sy = this.sh * Math.floor(this.frame / this.columns);
    
        var context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.width, this.height);
        context.drawImage(this.spritesheet, sx, sy, this.sw, this.sh, 0, 0, this.width, this.height);
    }
        
    tick(time) {
        var scope = this,
        func = function(time){
            if (scope.isDirty) {
                scope.draw(time || new Date().getTime());
                requestAnimationFrame(func, scope.id);
                scope.isDirty = false;
                //only draw to canvas when new frame differs from old
            };
        };
        func();
    }

    setFrame(frame) {
        var tempFrame = Math.round(frame * (this.total_frames-1));;
        if(tempFrame != this.frame) {
            this.frame = tempFrame;
            this.isDirty = true;
            this.tick(new Date().getTime());
        }
    }
};