/**
 * Line and Mesh material types
 * @constructor
 */
$3Dmol.Material = function () {

    $3Dmol.EventDispatcher.call( this );

    this.id = $3Dmol.MaterialIdCount ++;

    this.name = '';

    //TODO: Which of these instance variables can I remove??
    this.side = $3Dmol.FrontSide;

    this.opacity = 1;
    this.transparent = false;

    this.depthTest = true;
    this.depthWrite = true;

    this.stencilTest = true;

    this.polygonOffset = false;
    this.polygonOffsetFactor = 0;
    this.polygonOffsetUnits = 0;

    this.alphaTest = 0;

    this.visible = true;

    this.needsUpdate = true;

};


$3Dmol.Material.prototype.setValues = function ( values ) {

    if ( values === undefined ) return;

    for ( var key in values ) {

        var newValue = values[ key ];

        if ( newValue === undefined ) {

            console.warn( '$3Dmol.Material: \'' + key + '\' parameter is undefined.' );
            continue;

        }

        if ( key in this ) {

            var currentValue = this[ key ];

            if ( currentValue instanceof $3Dmol.Color && newValue instanceof $3Dmol.Color ) {

                currentValue.copy( newValue );

            } else if ( currentValue instanceof $3Dmol.Color ) {

                currentValue.set( newValue );

            } else if ( currentValue instanceof $3Dmol.Vector3 && newValue instanceof $3Dmol.Vector3 ) {

                currentValue.copy( newValue );

            } else {

                this[ key ] = newValue;

            }

        }

    }

};
//TODO: might want to look into blending equations
$3Dmol.Material.prototype.clone = function ( material ) {

    if ( material === undefined ) material = new $3Dmol.Material();

    material.name = this.name;

    material.side = this.side;

    material.opacity = this.opacity;
    material.transparent = this.transparent;

    material.depthTest = this.depthTest;
    material.depthWrite = this.depthWrite;
    material.stencilTest = this.stencilTest;

    material.polygonOffset = this.polygonOffset;
    material.polygonOffsetFactor = this.polygonOffsetFactor;
    material.polygonOffsetUnits = this.polygonOffsetUnits;

    material.alphaTest = this.alphaTest;

    material.overdraw = this.overdraw;

    material.visible = this.visible;

    return material;

};

$3Dmol.Material.prototype.dispose = function () {

    this.dispatchEvent( { type: 'dispose' } );

};

$3Dmol.MaterialIdCount = 0;

//Line basic material
/** @constructor */
$3Dmol.LineBasicMaterial = function(parameters) {

    $3Dmol.Material.call(this);

    this.color = new $3Dmol.Color(0xffffff);

    this.linewidth = 1;
    this.linecap = 'round';
    this.linejoin = 'round';

    this.vertexColors = false;

    this.fog = true;
    this.shaderID = "basic";
    this.setValues(parameters);

};

$3Dmol.LineBasicMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.LineBasicMaterial.prototype.clone = function() {

    var material = new $3Dmol.LineBasicMaterial();

    $3Dmol.Material.prototype.clone.call(this, material);

    material.color.copy(this.color);
    return material;
};

//Mesh Lambert material
/** @constructor */
$3Dmol.MeshLambertMaterial = function(parameters) {

    $3Dmol.Material.call(this);

    this.color = new $3Dmol.Color(0xffffff);
    this.ambient = new $3Dmol.Color(0xfffff);
    this.emissive = new $3Dmol.Color(0x000000);

    //TODO: Which of these instance variables do I really need?
    this.wrapAround = false;
    this.wrapRGB = new $3Dmol.Vector3(1,1,1);

    this.map = null;

    this.lightMap = null;

    this.specularMap = null;

    this.envMap = null;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;

    this.fog = true;

    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = 'round';
    this.wireframeLinejoin = 'round';

    this.shading = $3Dmol.SmoothShading;
    this.shaderID = "lambert";
    this.vertexColors = $3Dmol.NoColors;

    this.skinning = false;

    this.setValues(parameters);

};

$3Dmol.MeshLambertMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.MeshLambertMaterial.prototype.clone = function(material) {

    if ( typeof material === "undefined" ) material = new $3Dmol.MeshLambertMaterial();

    $3Dmol.Material.prototype.clone.call(this, material);

    material.color.copy(this.color);
    material.ambient.copy(this.ambient);
    material.emissive.copy(this.emissive);

    material.wrapAround = this.wrapAround;
    material.wrapRGB.copy(this.wrapRGB);

    material.map = this.map;

    material.lightMap = this.lightMap;

    material.specularMap = this.specularMap;

    material.envMap = this.envMap;
    material.combine = this.combine;
    material.reflectivity = this.reflectivity;
    material.refractionRatio = this.refractionRatio;

    material.fog = this.fog;

    material.shading = this.shading;
    material.shaderID = this.shaderID;
    material.vertexColors = this.vertexColors;

    material.skinning = this.skinning;
    material.morphTargets = this.morphTargets;
    material.morphNormals = this.morphNormals;

    return material;

};

//Double sided Mesh Lambert material
/** @constructor */
$3Dmol.MeshDoubleLambertMaterial = function(parameters) {

    $3Dmol.MeshLambertMaterial.call(this, parameters);

    this.shaderID = "lambertdouble";
    this.side = $3Dmol.DoubleSide;

};

$3Dmol.MeshDoubleLambertMaterial.prototype = Object.create($3Dmol.MeshLambertMaterial.prototype);

$3Dmol.MeshDoubleLambertMaterial.prototype.clone = function() {

    var material = new $3Dmol.MeshDoubleLambertMaterial();

    $3Dmol.MeshLambertMaterial.prototype.clone.call(this, material);

    return material;

};

//Outlined Mesh Lamert material
/** @constructor */
$3Dmol.MeshOutlineMaterial = function(parameters) {
    $3Dmol.Material.call(this);
    parameters = parameters || {};
    this.fog = true;
    this.shaderID = "outline";
    this.wireframe=false;
    this.outlineColor= parameters.color || new $3Dmol.Color(0.0,0.0,0.0);
    this.outlineWidth= parameters.width || 0.1;
    this.outlinePushback= parameters.pushback || 1.0;

};

$3Dmol.MeshOutlineMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.MeshOutlineMaterial.prototype.clone = function(material) {
    if ( typeof material === "undefined" ) material = new $3Dmol.MeshOutlineMaterial();
    $3Dmol.Material.prototype.clone.call(this, material);
    material.fog = this.fog;
    material.shaderID = this.shaderID;
    material.wireframe = this.wireframe;
    return material;
};


//Imposter material
/** @constructor */
$3Dmol.ImposterMaterial = function(parameters) {

  $3Dmol.Material.call(this);

  this.color = new $3Dmol.Color(0xffffff);
  this.ambient = new $3Dmol.Color(0xfffff);
  this.emissive = new $3Dmol.Color(0x000000);
  this.imposter = true;

  //TODO: Which of these instance variables do I really need?
  this.wrapAround = false;
  this.wrapRGB = new $3Dmol.Vector3(1,1,1);

  this.map = null;

  this.lightMap = null;

  this.specularMap = null;

  this.envMap = null;
  this.reflectivity = 1;
  this.refractionRatio = 0.98;

  this.fog = true;

  this.wireframe = false;
  this.wireframeLinewidth = 1;
  this.wireframeLinecap = 'round';
  this.wireframeLinejoin = 'round';

  this.shading = $3Dmol.SmoothShading;
  this.shaderID = null;
  this.vertexColors = $3Dmol.NoColors;

  this.skinning = false;

  this.setValues(parameters);

};

$3Dmol.ImposterMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.ImposterMaterial.prototype.clone = function() {

  var material = new $3Dmol.ImposterMaterial();

  $3Dmol.Material.prototype.clone.call(this, material);

  material.color.copy(this.color);
  material.ambient.copy(this.ambient);
  material.emissive.copy(this.emissive);

  material.wrapAround = this.wrapAround;
  material.wrapRGB.copy(this.wrapRGB);

  material.map = this.map;

  material.lightMap = this.lightMap;

  material.specularMap = this.specularMap;

  material.envMap = this.envMap;
  material.combine = this.combine;
  material.reflectivity = this.reflectivity;
  material.refractionRatio = this.refractionRatio;

  material.fog = this.fog;

  material.shading = this.shading;
  material.shaderID = this.shaderID;
  material.vertexColors = this.vertexColors;

  material.skinning = this.skinning;
  material.morphTargets = this.morphTargets;
  material.morphNormals = this.morphNormals;

  return material;

};


$3Dmol.SphereImposterMaterial = function(parameters) {

    $3Dmol.ImposterMaterial.call(this);

    this.shaderID = "sphereimposter";
    this.setValues(parameters);

};

$3Dmol.SphereImposterMaterial.prototype = Object.create($3Dmol.ImposterMaterial.prototype);

$3Dmol.SphereImposterMaterial.prototype.clone = function() {

    var material = new $3Dmol.SphereImposterMaterial();
    $3Dmol.ImposterMaterial.prototype.clone.call(this, material);
    return material;
};


$3Dmol.SphereImposterOutlineMaterial = function(parameters) {

    $3Dmol.ImposterMaterial.call(this);
    parameters = parameters || {};

    this.shaderID = "sphereimposteroutline";
    this.outlineColor= parameters.color || new $3Dmol.Color(0.0,0.0,0.0);
    this.outlineWidth= parameters.width || 0.1;
    this.outlinePushback= parameters.pushback || 1.0;

    this.setValues(parameters);

};

$3Dmol.SphereImposterOutlineMaterial.prototype = Object.create($3Dmol.ImposterMaterial.prototype);

$3Dmol.SphereImposterOutlineMaterial.prototype.clone = function() {

    var material = new $3Dmol.SphereImposterOutlineMaterial();
    $3Dmol.ImposterMaterial.prototype.clone.call(this, material);
    material.outlineColor = this.outlineColor;
    material.outlineWidth = this.outlineWidth;
    material.outlinePushback = this.outlinePushback;
    return material;
};


$3Dmol.StickImposterMaterial = function(parameters) {

    $3Dmol.ImposterMaterial.call(this);

    this.shaderID = "stickimposter";
    this.setValues(parameters);

};

$3Dmol.StickImposterMaterial.prototype = Object.create($3Dmol.ImposterMaterial.prototype);

$3Dmol.StickImposterMaterial.prototype.clone = function() {

    var material = new $3Dmol.StickImposterMaterial();
    $3Dmol.ImposterMaterial.prototype.clone.call(this, material);
    return material;
};


$3Dmol.StickImposterOutlineMaterial = function(parameters) {

    $3Dmol.ImposterMaterial.call(this);
    parameters = parameters || {};

    this.shaderID = "stickimposteroutline";
    this.outlineColor= parameters.color || new $3Dmol.Color(0.0,0.0,0.0);
    this.outlineWidth= parameters.width || 0.1;
    this.outlinePushback= parameters.pushback || 1.0;

    this.setValues(parameters);

};

$3Dmol.StickImposterOutlineMaterial.prototype = Object.create($3Dmol.ImposterMaterial.prototype);

$3Dmol.StickImposterOutlineMaterial.prototype.clone = function() {

    var material = new $3Dmol.StickImposterOutlineMaterial();
    $3Dmol.ImposterMaterial.prototype.clone.call(this, material);
    material.outlineColor = this.outlineColor;
    material.outlineWidth = this.outlineWidth;
    material.outlinePushback = this.outlinePushback;
    return material;
};


$3Dmol.InstancedMaterial = function(parameters) {

    $3Dmol.Material.call(this);

    this.color = new $3Dmol.Color(0xffffff);
    this.ambient = new $3Dmol.Color(0xfffff);
    this.emissive = new $3Dmol.Color(0x000000);

    //TODO: Which of these instance variables do I really need?
    this.wrapAround = false;
    this.wrapRGB = new $3Dmol.Vector3(1,1,1);

    this.map = null;

    this.lightMap = null;

    this.specularMap = null;

    this.envMap = null;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;

    this.fog = true;

    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = 'round';
    this.wireframeLinejoin = 'round';

    this.shading = $3Dmol.SmoothShading;
    this.shaderID = "instanced";
    this.vertexColors = $3Dmol.NoColors;

    this.skinning = false;

    this.sphere = null;

    this.setValues(parameters);

};

$3Dmol.InstancedMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.InstancedMaterial.prototype.clone = function() {

    var material = new $3Dmol.InstancedMaterial();

    $3Dmol.Material.prototype.clone.call(this, material);

    material.color.copy(this.color);
    material.ambient.copy(this.ambient);
    material.emissive.copy(this.emissive);

    material.wrapAround = this.wrapAround;
    material.wrapRGB.copy(this.wrapRGB);

    material.map = this.map;

    material.lightMap = this.lightMap;

    material.specularMap = this.specularMap;

    material.envMap = this.envMap;
    material.combine = this.combine;
    material.reflectivity = this.reflectivity;
    material.refractionRatio = this.refractionRatio;

    material.fog = this.fog;

    material.shading = this.shading;
    material.shaderID = this.shaderID;
    material.vertexColors = this.vertexColors;

    material.skinning = this.skinning;
    material.morphTargets = this.morphTargets;
    material.morphNormals = this.morphNormals;

    material.sphere = this.sphere;

  return material;

};


//Volumetric material
/** @constructor */
$3Dmol.VolumetricMaterial = function(parameters) {

    $3Dmol.Material.call(this);

    this.transparent = false;
    this.volumetric = true;

    this.color = new $3Dmol.Color(0xffffff);
    this.transferfn = null;
    this.map = null;
    this.volumetric = true;
    this.extent = [];
    this.maxdepth = 100.0;
    this.unit = 0;
    this.texmatrix = null;
    this.transfermin = -1.0;
    this.transfermax = 1.0;
    this.subsamples = 5.0;
    this.textmap = null;

    // this.fog = true; // TODO: to integrate the new shader with the fog stuff

    this.shaderID = "volumetric";
    this.side = $3Dmol.FrontSide;

    this.setValues(parameters);
};

$3Dmol.VolumetricMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.VolumetricMaterial.prototype.clone = function() {

    var material = Object.assign(new $3Dmol.VolumetricMaterial(),this);

    $3Dmol.Material.prototype.clone.call(this, material);
    return material;

};

//Sprite material
/** @constructor */
$3Dmol.SpriteMaterial = function(parameters) {

    $3Dmol.Material.call(this);

    this.color = new $3Dmol.Color(0xffffff);
    this.map = new $3Dmol.Texture();

    this.useScreenCoordinates = true;
    this.depthTest = !this.useScreenCoordinates;
    this.sizeAttenuation = !this.useScreenCoordinates;
    this.scaleByViewPort = !this.sizeAttenuation;
    this.alignment = $3Dmol.SpriteAlignment.center.clone();

    this.fog = false; // use scene fog

    this.uvOffset = new $3Dmol.Vector2(0, 0);
    this.uvScale = new $3Dmol.Vector2(1, 1);

    this.setValues(parameters);

    parameters = parameters || {};

    if (parameters.depthTest === undefined)
        this.depthTest = !this.useScreenCoordinates;
    if (parameters.sizeAttenuation === undefined)
        this.sizeAttenuation = !this.useScreenCoordinates;
    if (parameters.scaleByViewPort === undefined)
        this.scaleByViewPort = !this.sizeAttenuation;

};

$3Dmol.SpriteMaterial.prototype = Object.create($3Dmol.Material.prototype);

$3Dmol.SpriteMaterial.prototype.clone = function() {

    var material = new $3Dmol.SpriteMaterial();

    $3Dmol.Material.prototype.clone.call(this, material);

    material.color.copy(this.color);
    material.map = this.map;

    material.useScreenCoordinates = this.useScreenCoordinates;
    material.sizeAttenuation = this.sizeAttenuation;
    material.scaleByViewport = this.scaleByViewPort;
    material.alignment.copy(this.alignment);

    material.uvOffset.copy(this.uvOffset);

    return material;

};

//Alignment for Sprites

$3Dmol.SpriteAlignment = {};
$3Dmol.SpriteAlignment.topLeft = new $3Dmol.Vector2(1, -1);
$3Dmol.SpriteAlignment.topCenter = new $3Dmol.Vector2(0, -1);
$3Dmol.SpriteAlignment.topRight = new $3Dmol.Vector2(-1, -1);
$3Dmol.SpriteAlignment.centerLeft = new $3Dmol.Vector2(1, 0);
$3Dmol.SpriteAlignment.center = new $3Dmol.Vector2(0, 0);
$3Dmol.SpriteAlignment.centerRight = new $3Dmol.Vector2(-1, 0);
$3Dmol.SpriteAlignment.bottomLeft = new $3Dmol.Vector2(1, 1);
$3Dmol.SpriteAlignment.bottomCenter = new $3Dmol.Vector2(0, 1);
$3Dmol.SpriteAlignment.bottomRight = new $3Dmol.Vector2(-1, 1);


//Texture
//We really only create textures from 2d rendering contexts (to display text labels)
//edit: we can now create 3dtextures using volumetric data
/** @constructor */
$3Dmol.Texture = function(image, is3D) {

    $3Dmol.EventDispatcher.call(this);

    this.id = $3Dmol.TextureIdCount++;

    this.name = "";

    this.image = image;

    this.mapping = new $3Dmol.UVMapping();

    this.wrapS = $3Dmol.ClampToEdgeWrapping;
    this.wrapT = $3Dmol.ClampToEdgeWrapping;

    this.anisotropy = 1;

    if (is3D){
        this.format = $3Dmol.RFormat;
        this.type = $3Dmol.FloatType;

        this.premultiplyAlpha = false;
        this.flipY = false;

        this.unpackAlignment = 1;

        this.magFilter = $3Dmol.NearestFilter;
        this.minFilter = $3Dmol.NearestFilter;
    } else {
        this.format = $3Dmol.RGBAFormat;
        this.type = $3Dmol.UnsignedByteType;

        this.offset = new $3Dmol.Vector2(0, 0);
        this.repeat = new $3Dmol.Vector2(1, 1);

        this.premultiplyAlpha = false;
        this.flipY = true;
        this.unpackAlignment = 4;

        this.magFilter = $3Dmol.LinearFilter;
        this.minFilter = $3Dmol.LinearMipMapLinearFilter;

    }


    this.needsUpdate = false;
    this.onUpdate = null;

};

$3Dmol.Texture.prototype = {

    constructor : $3Dmol.Texture,

    clone : function(texture) {

        if (texture === undefined)
            texture = new $3Dmol.Texture();

        texture.image = this.image;

        texture.mapping = this.mapping;

        texture.wrapS = this.wrapS;
        texture.wrapT = this.wrapT;

        texture.magFilter = this.magFilter;
        texture.minFilter = this.minFilter;

        texture.anisotropy = this.anisotropy;

        texture.format = this.format;
        texture.type = this.type;

        texture.offset.copy(this.offset);
        texture.repeat.copy(this.repeat);

        texture.premultiplyAlpha = this.premultiplyAlpha;
        texture.flipY = this.flipY;
        texture.unpackAlignment = this.unpackAlignment;

        return texture;

    },

    dispose : function() {

        this.dispatchEvent( {type: 'dispose'});

    }

};

$3Dmol.TextureIdCount = 0;


// sides
$3Dmol.FrontSide = 0;
$3Dmol.BackSide = 1;
$3Dmol.DoubleSide = 2;

// shading
$3Dmol.NoShading = 0;
$3Dmol.FlatShading = 1;
$3Dmol.SmoothShading = 2;

// colors
$3Dmol.NoColors = 0;
$3Dmol.FaceColors = 1;
$3Dmol.VertexColors = 2;

//Texture constants
//TODO: Which of these do I need (since I only use textures to display label sprites) ?
$3Dmol.MultiplyOperation = 0;
$3Dmol.MixOperation = 1;
$3Dmol.AddOperation = 2;

// mapping modes

$3Dmol.UVMapping = function() {};

// wrapping modes
$3Dmol.ClampToEdgeWrapping = 1001;

//Filters
$3Dmol.LinearFilter = 1006;
$3Dmol.NearestFilter = 1007;
$3Dmol.LinearMipMapLinearFilter = 1008;

//Data types
$3Dmol.UnsignedByteType = 1009;
$3Dmol.FloatType = 1010;

//Pixel formats
$3Dmol.RGBAFormat = 1021;
$3Dmol.RFormat = 1022;
$3Dmol.R32Format = 1023;
