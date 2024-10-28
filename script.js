function node(value){
    let data=value;
    let left=null;
    let right=null;
    return {data,left,right};
}

function Tree(arr){
    let root=null;
    const buildTree=(arr)=>{
        arr.sort();
        let prev=null;
        for(let i=0;i<arr.length;i++){
            if(arr[i]==prev){
                arr.splice(i,1);
                i--;
            } 
            else prev=arr[i];
        }
        console.log(arr);
        root=createBST(arr,0,arr.length-1);
    }
    const createBST=(arr,start,end)=>{
        //console.log(arr,start,end);
        if(start>end) return null;
        let mid=Math.floor((start+end)/2);
        let root=node(arr[mid]);
        root.left=createBST(arr,start,mid-1);
        root.right=createBST(arr,mid+1,end);
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
        root=insertNode(value,root);
    }

    const insertNode=(value, treenode)=>{
        if(treenode==null) return node(value);
        if(value<treenode.data) treenode.left=insertNode(value,treenode.left);
        else if(value>treenode.data) treenode.right=insertNode(value,treenode.right);
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

    const inOrder=(callback,node=root)=>{
        if(node==null) return;
        inOrder(callback,node.left);
        callback(node);
        inOrder(callback,node.right);
    }

    const preOrder=(callback,node=root)=>{
        if(node==null) return;
        callback(node);
        preOrder(callback,node.left);
        preOrder(callback,node.right);
    }

    const postOrder=(callback,node=root)=>{
        if(node==null) return;
        postOrder(callback,node.left);
        postOrder(callback,node.right);
        callback(node);
    }

    buildTree(arr);
    return {root,buildTree,prettyPrint,find,insert,deleteItem,levelOrder,inOrder,preOrder,postOrder};
}

let tree=Tree([1,2,2,3,4,5,6,6,6,7]);
tree.insert(25);
console.log(tree);
tree.prettyPrint();
tree.preOrder((value)=>console.log(value.data));
tree.prettyPrint();