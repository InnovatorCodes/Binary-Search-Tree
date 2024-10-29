function node(value,depthparam){
    let data=value;
    let depth=depthparam;
    let left=null;
    let right=null;
    return {data,left,right,depth};
}

function Tree(arr){
    let root=null;
    const buildTree=(arr)=>{
        arr=[...new Set(arr.sort((a,b)=>a-b))];
        //console.log(arr);
        root=createBST(arr,0,arr.length-1,0);
        //console.log(root);
    }
    const createBST=(arr,start,end,depth)=>{
        //console.log(arr,start,end);
        if(start>end) return null;
        let mid=Math.floor((start+end)/2);
        let root=node(arr[mid],depth);
        root.left=createBST(arr,start,mid-1,depth+1);
        root.right=createBST(arr,mid+1,end,depth+1);
        return root;
    }
    const prettyPrint = (node=root, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
    
    const find=(value,current=root)=>{
        if(current==null) return null;
        else if(value<current.data) return find(value,current.left);
        else if(value==current.data) return current;
        else return find(value,current.right);
    }

    const insert= (value)=>{
        root=insertNode(value,root,0);
    }

    const insertNode=(value, treenode,depth)=>{
        if(treenode==null) return node(value,depth);
        if(value<treenode.data) treenode.left=insertNode(value,treenode.left,depth+1);
        else if(value>treenode.data) treenode.right=insertNode(value,treenode.right,depth+1);
        return treenode;
    }
    
    const deleteItem=(value)=>{
        let parentNode=null;
        let delNode=root;
        while(delNode!=null && delNode.data!=value){
            parentNode=delNode;
            if(value<delNode.data) delNode=delNode.left;
            else if(value>delNode.data) delNode=delNode.right;
        }
        if(delNode==null) return false;
        else{
            if(!(delNode.left || delNode.right)){
                if(delNode.data>parentNode.data) parentNode.right=null;
                else parentNode.left=null;
            }
            else if(delNode.left && !delNode.right){
                delNode.data=delNode.left.data;
                delNode.left=null;
            }
            else if(delNode.right && !delNode.left){
                delNode.data=delNode.right.data;
                delNode.right=null;
            }
            else{
                let smallestNode=delNode.right;
                parentNode=delNode;
                while(smallestNode.left){
                    parentNode=smallestNode;
                    smallestNode=smallestNode.left;
                }
                let smallestValue=smallestNode.data;
                if(smallestNode.data>parentNode.data) parentNode.right=null;
                else parentNode.left=null;
                delNode.data=smallestValue;
            }
        }
    }
    
    const levelOrder=(callback)=>{
        const queue=[root];
        while(queue.length!=0){
            let currentNode=queue[0];
            callback(currentNode);
            if(currentNode.left) queue.push(currentNode.left);
            if(currentNode.right) queue.push(currentNode.right);
            queue.shift();
        }
    }

    const inOrder=(callback,treenode=root)=>{
        if(treenode==null) return;
        inOrder(callback,treenode.left);
        callback(treenode);
        inOrder(callback,treenode.right);
    }

    const preOrder=(callback,treenode=root)=>{
        if(treenode==null) return;
        callback(treenode);
        preOrder(callback,treenode.left);
        preOrder(callback,treenode.right);
    }

    const postOrder=(callback,treenode=root)=>{
        if(treenode==null) return;
        postOrder(callback,treenode.left);
        postOrder(callback,treenode.right);
        callback(treenode);
    }

    const height=(treenode)=>{
        if(treenode==null) return 0;
        const {getMaxDepth,setMaxDepth}=maximizeDepth();
        preOrder(setMaxDepth,treenode);
        return getMaxDepth()-treenode.depth;
    }

    const maximizeDepth=()=>{
        let maxdepth=0;
        const getMaxDepth=()=>maxdepth;
        const setMaxDepth=(treenode)=>{
            treenode.depth>maxdepth? maxdepth=treenode.depth: maxdepth=maxdepth;
        }
        return {getMaxDepth,setMaxDepth};
    }

    const depth=(treenode)=>{
        if(treenode==null) return null;
        return treenode.depth;
    }

    const isBalanced=(treenode=root)=>{
        let heightDiff=height(treenode.left)-height(treenode.right);
        return (heightDiff<=1 && heightDiff>=-1);
    }

    const rebalance=()=>{
        const allNodes=[];
        inOrder(((treenode)=>allNodes.push(treenode.data)),root);
        //console.log(allNodes);
        buildTree(allNodes);
    }

    buildTree(arr);
    return {root,buildTree,prettyPrint,find,insert,deleteItem,levelOrder,inOrder,preOrder,postOrder,height,depth,isBalanced,rebalance};
}

let arr=[]
for(let i=0;i<10;i++) arr.push(Math.floor(Math.random()*100));
let tree=Tree(arr);
console.log(tree.isBalanced());
let allElements=[];
tree.levelOrder((treenode)=>allElements.push(treenode.data));
console.log(allElements);
allElements=[];
tree.preOrder((treenode)=>allElements.push(treenode.data));
console.log(allElements);
allElements=[];
tree.inOrder((treenode)=>allElements.push(treenode.data));
console.log(allElements);
allElements=[];
tree.postOrder((treenode)=>allElements.push(treenode.data));
console.log(allElements);
for(let i=0;i<5;i++) tree.insert(Math.floor(Math.random()*100+100));
tree.prettyPrint();
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
tree.prettyPrint();
allElements=[];
tree.levelOrder((treenode)=>allElements.push(treenode.data));
console.log(allElements);
allElements=[];
tree.preOrder((treenode)=>allElements.push(treenode.data));
console.log(allElements);
allElements=[];
tree.inOrder((treenode)=>allElements.push(treenode.data));
console.log(allElements);
allElements=[];
tree.postOrder((treenode)=>allElements.push(treenode.data));
console.log(allElements);