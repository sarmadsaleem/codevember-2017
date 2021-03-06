function ShaderTexture( renderer, shader, width, height ) {

	this.renderer = renderer;
	this.shader = shader;
	this.orthoScene = new THREE.Scene();
	this.fbo = new THREE.WebGLRenderTarget( width, height, {
		wrapS: THREE.RepeatWrapping,
		wrapT: THREE.RepeatWrapping,
		minFilter: THREE.LinearMipMapLinearFilter,
		magFilter: THREE.LinearFilter
	} );
	this.orthoCamera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, .00001, 1000 );
	this.orthoQuad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1, 1 ), this.shader );
	this.orthoQuad.scale.set( width, height, 1. );
	this.orthoScene.add( this.orthoQuad );
	this.texture = this.fbo.texture;

}

ShaderTexture.prototype.render = function( final ) {

	this.renderer.render( this.orthoScene, this.orthoCamera, final?null:this.fbo );

}

ShaderTexture.prototype.setSize = function( width, height ) {

	this.orthoQuad.scale.set( width, height, 1. );

	this.fbo.setSize( width, height );

	this.orthoQuad.scale.set( width, height, 1 );

	this.orthoCamera.left   = - width / 2;
	this.orthoCamera.right  =   width / 2;
	this.orthoCamera.top    =   height / 2;
	this.orthoCamera.bottom = - height / 2;
	this.orthoCamera.updateProjectionMatrix();

}
