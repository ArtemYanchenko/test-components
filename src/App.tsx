import React, {useState} from 'react';
import './App.css';
import {ShoppingList} from './components/ShoppingList';
import {FilterValue, GoodsType, GoodType, ShoplistsType} from './Typisation';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';


function App() {

    // const shoplist1 = v1()
    // const shoplist2 = v1()
    //
    // const [shoplists, setShoplists] = useState<ShoplistsType[]>([
    //     {id: shoplist1, title: "What to buy", filter: "All"},
    //     {id: shoplist2, title: "What to buy today", filter: "All"},
    // ])
    //
    // const [goods, setGoods] = useState<GoodsType>({
    //     [shoplist1]: [
    //         {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
    //         {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
    //         {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
    //         {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
    //     ],
    //     [shoplist2]: [
    //         {id: v1(), title: 'Tomato', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
    //         {id: v1(), title: 'Potato', expectedPrice: '$0.99', realPrice: '$0.89', inCart: false},
    //         {id: v1(), title: 'Cucumber', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
    //         {id: v1(), title: 'Sugar', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
    //     ],
    // })


    const [shoplist, setShoplist] = useState<ShoplistsType[]>([
        {
            title: 'What to buy',
            filter: 'All',
            goods: [
                {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
                {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
                {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
                {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
            ]
        },
        {
            title: 'What to buy today',
            filter: 'All',
            goods: [
                {id: v1(), title: 'Tomato', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
                {id: v1(), title: 'Potato', expectedPrice: '$0.99', realPrice: '$0.89', inCart: false},
                {id: v1(), title: 'Cucumber', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
                {id: v1(), title: 'Sugar', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
            ]
        }
    ])

    const addGoods = (shoplistId: string, title: string) => {
        const getRandomNumberForExpectedPrice = Math.floor((Math.random() * 10) + 1)
        const getRandomNumberForRealPrice = Math.floor((Math.random() * 10) + 1)
        const addNewGoods = {
            id: v1(),
            title: title,
            expectedPrice: `$${getRandomNumberForExpectedPrice}`,
            realPrice: '$' + getRandomNumberForRealPrice,
            inCart: false
        }
        setShoplist(shoplist.map((el, index) => index.toString() === shoplistId ? {
            ...el,
            goods: [addNewGoods, ...el.goods]
        } : el))
    }

    const changeFilterValue = (shoplistId: string, filter: FilterValue) => {
        setShoplist(shoplist.map((el, index) => index.toString() === shoplistId ? {...el, filter} : el))
    }

    const deleteGoods = (shoplistId: string, id: string) => {
        setShoplist(shoplist.map((el, index) => index.toString() === shoplistId ? {
            ...el,
            goods: el.goods.filter(g => g.id !== id)
        } : el))
    }

    const changeGoodsStatus = (shoplistId: string, goodsId: string, inChecked: boolean) => {
        setShoplist(shoplist.map((el, index) => index.toString() === shoplistId ? {
            ...el,
            goods: el.goods.map(g => g.id === goodsId ? {...g, inCart: inChecked} : g)
        } : el))
    }

    const deleteShopList = (shoplistId: string) => {
        setShoplist(shoplist.filter((el, index) => index.toString() !== shoplistId))
    }

    const AddShopList = (shoplistTitle: string) => {
        const newShoplistId = v1()
        const newShopList: ShoplistsType = {title: shoplistTitle, filter: 'All', goods: []}
        setShoplist([newShopList, ...shoplist])
    }


    const updateGoodTitle = (shoplistId: string, goodId: string, newTitle: string) => {
        setShoplist(shoplist.map((el, index) => index.toString() === shoplistId ? {
            ...el,
            goods: el.goods.map(g => g.id === goodId ? {...g, title: newTitle} : g)
        } : el))
    }

    const updateShoplistTitle = (shoplistId: string, newTitle: string) => {
        setShoplist(shoplist.map((el, index) => index.toString() === shoplistId ? {...el, title: newTitle} : el))
    }

    const mappedShoplists = shoplist.map((el, index) => {

        let filteredGoods: Array<GoodType> = []
        if (el.filter === 'All') {
            filteredGoods = el.goods
        }
        if (el.filter === 'Not to buy') {
            filteredGoods = el.goods.filter(el => el.inCart !== true)
        }
        if (el.filter === 'Bought') {
            filteredGoods = el.goods.filter(el => el.inCart === true)
        }

        return (
            <ShoppingList
                key={index}
                title={el.title}
                goods={filteredGoods}
                addGoods={addGoods}
                changeFilterValue={changeFilterValue}
                deleteGoods={deleteGoods}
                changeGoodsStatus={changeGoodsStatus}
                filter={el.filter}
                deleteTodoList={deleteShopList}
                shoplistId={index.toString()}
                updateGoodTitle={updateGoodTitle}
                updateShoplistTitle={updateShoplistTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm callback={AddShopList}/>
            {/*<span><input type="text" value={title} onChange={onChangeHadler}/><button onClick={AddShopList}>send new todo</button></span>*/}
            {mappedShoplists}
        </div>
    );
}

export default App;
