import NewItem from '../newItem/newItem'
import React, { useState, useMemo, useCallback, createContext } from "react";
import Nav from '../../common/nav/nav'

export const RegisterContext = createContext();
export const CancleContext = createContext();

const Home = () => {
    const [isVisibility, setNewItemFormVisibility] = useState(false);
    const startNewItemHandler = () => {
        setNewItemFormVisibility(true);
    }
    const cancleNewItemHandler = () => {
        setNewItemFormVisibility(false);
    };
    const memoizedCancle = useMemo(() => {
        return { cancleNewItemHandler };
    }, []);

    const [nextItemId, setNextItemId] = useState(0);

    const onAdd = useCallback((addItemData) => {
        setNextItemId((nextItemId) => nextItemId + 1);
        // setIsAddItem(true);
        // setItems((prevItems) => [...prevItems, addItemData]);
      }, []);
    
      const onRemove = useCallback((deleteItemData) => {
        // setIsAddItem(false);
        // setItems((items) =>
        //   [...items].filter((item) => item.id !== deleteItemData)
        // );
      }, []);
    
      const memoizedDispatches = useMemo(() => {
        return { onAdd, onRemove };
      }, [onAdd, onRemove]);
    
      const memoizedNextItemId = useMemo(() => {
        return { nextItemId };
      }, [nextItemId])

    return (
        <RegisterContext.Provider value={[memoizedDispatches, memoizedNextItemId]}>
            <Nav />
            <div className="home">
                { !isVisibility && (
                    <button className="add-new-item-button" onClick={startNewItemHandler}>내역 추가하기</button>
                ) }
                { isVisibility && (
                    <CancleContext.Provider value={memoizedCancle}>
                        <NewItem />
                    </CancleContext.Provider>
                )}
            </div>
        </RegisterContext.Provider>
    )
}

export default Home