<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="isOpen = true"> Add New Product</button>
    <teleport to="body">
      <div class="modal" v-if="isOpen">
        <NewProduct @close="isOpen = false">

        </NewProduct>
      </div>
    </teleport>

    <button class="btn-add" @click="firebaseAddSingleItem()">Add Item</button>
    <div>
      <input type="text" placeholder="Product name" v-model="AddProductData.productName" >

    </div>
    <hr>

    <div v-for="product in products" :key="product">
      <p>
        ProductID: {{ product.id  }}
      </p>
      <p>
        ProductName: {{ product.productName }}
      </p>
      <p>
        ProductPrice: {{ product.productPrice }}
      </p>
      <button class="btn-delete" @click="firebaseDeleteSingleItem(product.id)">Delete item</button>
    
      <p>
        <input type="text" placeholder="New product name" v-model="product.productName" />
      </p>
      <button class="btn-edit" @click="firebaseUpdateSingleItem(product.id)">Edit item</button>
      <hr>
    </div>
  </div>
</template>

<script setup>
import NewProduct from '../components/NewProduct.vue';
import useProducts from '../modules/useProducts.js';
import { onMounted } from 'vue'

import { ref } from 'vue';
const isOpen = ref(false);

const { 
  products, 
  getProductsData, 
  firebaseDeleteSingleItem, 
  firebaseAddSingleItem ,
  AddProductData,
  firebaseUpdateSingleItem,
  //UpdateProductData
} = useProducts();

onMounted(() => {
  getProductsData();
})


</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal > div {
  background-color: #555;
  border-radius: 10px;
  padding: 20px;
  width:90%;
  height:400px;
  top:40px;
  left:40px;
  position: absolute;
}

#floatyClose {
  position: absolute;
  top: 96px;
  margin: 10px;
  cursor: pointer;
  z-index:110;
}

</style>
