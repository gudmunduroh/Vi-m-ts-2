
function createVertexShader(gl)
{
    let code = `
        attribute vec3 coords; // Fyrir staðsetninguna á púnktunum

        void main(void)
        {
            /* Aðal fallið í vertex shadernum */
            gl_Position = vec4(coords, 1.0); // Setur gl_Position í staðsetningauna á púnkt með 1 fyrir aftan því það er vector4
        }
    `; // GLSL kóði fyrir shaderinn
    let shaderObject = gl.createShader(gl.VERTEX_SHADER); // Býr til vertex shader objectið
    gl.shaderSource(shaderObject, code); // Setur shader kóðann inn í það
    gl.compileShader(shaderObject); // Compilar shaderinn
    return shaderObject;
}

function createFragmentShader(gl)
{
    let code = `
        void main(void)
        {
            /*Aðal fallið í fragment shadernum*/
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
        }
    `; // GLSL kóði fyrir shaderinn
    
    let shaderObject = gl.createShader(gl.FRAGMENT_SHADER); // Býr til fragment shader objectið
    gl.shaderSource(shaderObject, code); // Setur kóðan í það
    gl.compileShader(shaderObject); // Compilar shaderinn
    return shaderObject;
}

function setupCanvas(gl, canvas)
{
    gl.clearColor(0.5, 0.5, 0.5, 0.9); // Tæmir canvasinn
    gl.enable(gl.DEPTH_TEST); // Kveikjir á depth test fyrir canvasinn
    gl.clear(gl.COLOR_BUFFER_BIT); // Tæmir color buffer bitann
    gl.viewport(0,0,canvas.width,canvas.height); // Setur viewport fyrir canvasinn
}

function drawTriangle(gl, canvas)
{
    let vertices = [
        -0.0,0.8,0.0,
        -0.9,-0.8,0.0,
        0.9,-0.8,0.0, 
     ]; // Staðsetningarnar á púnktunum í þríhyrningnum sem x, y og z.
     
    let indices = [0,1,2]; // Röðin sem púnktarnir verða tengdir í.

    let vertexBuffer = gl.createBuffer(); // Býr til buffer til að geyma staðsetningarnar
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // Bindar bufferinns
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // Setur allar staðsetningarnar (vertices) í bufferinn
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // Unbindar bufferinn

    let indexBuffer = gl.createBuffer(); // Býr til buffer til að geyma tengiröðina á púnktunum
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer); // Bindar bufferinn
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW); // Setur púnktaröðina í bufferinn
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); // Unbindar bufferinn

    let vertexShader = createVertexShader(gl); // Býr til shaderinn og setur hann í vertexShader variable
    let fragmentShader = createFragmentShader(gl); // Býr til shaderinn og setur hann í fragmentShader variable
    
    let shaderProgram = gl.createProgram(); // Býr til object til að geyma program fyrir báða shaderana
    gl.attachShader(shaderProgram, vertexShader); // Bætir vertex shadernum í það
    gl.attachShader(shaderProgram, fragmentShader); // Bætir fragment shadernum í það
    gl.linkProgram(shaderProgram); // Tengur báða saman
    gl.useProgram(shaderProgram); // Lætir webgl vita að þú viljir nota þetta shader program
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // Bindar vertex buffer objectið aftur
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer); // Bindar index buffer objectið aftur
    let coords = gl.getAttribLocation(shaderProgram, "coords"); // Fær staðsetninguna fyrir coords variable í vertex shadernum
    gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0); // Beinir því á vertex bufferinn
    gl.enableVertexAttribArray(coords); // Kveikjir á því svo coords fari að uppfærast með því sem það var beint á

    setupCanvas(gl, canvas); // Setur upp canvasinn

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0); // Teiknar þrýhirningin
}

window.addEventListener('load', function () {
    let canvas = document.getElementsByTagName("canvas")[0];
    let gl = canvas.getContext("webgl");

    drawTriangle(gl, canvas);
});