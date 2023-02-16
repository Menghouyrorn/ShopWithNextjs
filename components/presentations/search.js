import React from "react";
import { useState } from "react";
import styles from '../../styles/nav.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { firestore } from "../../services/firebase";
import ClearIcon from '@mui/icons-material/Clear';
import NextLink from 'next/link'


const search = () => {
    const [data, setData] = useState([])
    const [filterdata, setFilterdata] = useState([]);
    React.useEffect(() => {
        firestore.collection("User")
            .onSnapshot((snapshot) => {
                let data = snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        ...doc.data()
                    }
                ))
                data.forEach(function (item, index, array) {

                })

                setData(data)

            })

    }, [])
    const [word, setWord] = useState([])
    const handleSearch = (e) => {
        const searchWord = e.target.value;
        setWord(searchWord)
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        })
        if (searchWord === "") {
            setFilterdata([]);
        } else {
            setFilterdata(newFilter)
        }

    }
    const handleclear = (e) => {
        setFilterdata([])
        setWord('')
    }
    return (
        <div>
            <div className={styles.root}>
                <input type='text' placeholder='Search'
                    value={word}
                    style={{
                        width: 350,
                        height: 50,
                        color: 'white',
                    }}
                    onChange={handleSearch}
                />
                <div className={styles.btn}>
                    {filterdata.length === 0 ? (<SearchIcon />) : (<ClearIcon onClick={handleclear} />)}

                </div>
            </div>
            {filterdata.length != 0 && (
                <div className={styles.dataList}>
                    {filterdata.slice(0, 15).map((item, index) => {
                        return (
                            <div >
                                <NextLink href={`/products/${item.id}`} passHref>
                                    <a className={styles.valueList}>{item.name}</a>
                                </NextLink>
                            </div>
                        )
                    })}
                </div>
            )}

        </div>
    );
}

export default search;