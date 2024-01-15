/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        var transformedModelMatrix = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());
        var transformedModelView = modelView;
        var transformedMvp = MatrixMult(mvp, transformedModelMatrix);
        var transformedNormals = getNormalMatrix(MatrixMult(normalMatrix, transformedModelMatrix));
        var transformedModel = transformedModelMatrix;

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }        

        for (var i = 0; i < this.children.length; i++) {
            var childNode = this.children[i];
            var transformedChildModelMatrix = MatrixMult(transformedModelMatrix, childNode.trs.getTransformationMatrix());
            var transformedModelView = modelView;
            var transformedChildMvp = MatrixMult(mvp, transformedChildModelMatrix);
            var transformedChildNormals = getNormalMatrix(MatrixMult(normalMatrix, transformedChildModelMatrix));
            var transformedChildModel = transformedModelMatrix;
            
            childNode.meshDrawer.draw(transformedChildMvp, transformedModelView, transformedChildNormals, transformedChildModel);
        
            for (var j = 0; j < childNode.children.length; j++) {
                var grandChildNode = childNode.children[j];
                var transformedGrandChildModelMatrix = MatrixMult(transformedChildModelMatrix, grandChildNode.trs.getTransformationMatrix());
                var transformedModelView = modelView;
                var transformedGrandChildMvp = MatrixMult(mvp, transformedGrandChildModelMatrix);
                var transformedGrandChildNormals = getNormalMatrix(MatrixMult(normalMatrix, transformedGrandChildModelMatrix));
                var transformedGrandChildModel = transformedGrandChildModelMatrix;
                
                grandChildNode.meshDrawer.draw(transformedGrandChildMvp, transformedModelView, transformedGrandChildNormals, transformedGrandChildModel);
            }
        }
        
    }
}