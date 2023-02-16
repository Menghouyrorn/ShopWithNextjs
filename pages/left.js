import React from 'react';
import profilePic from './../styles/images (1).png';
import Image from 'next/image'
import styles from '../styles/nav.module.css';

export default function left() {
    const [value, setvalue] = React.useState(1);
    return (
        <div>
            <div className={styles.value} >
                <h1> Information student 1 </h1>
                <button onClick={() => setvalue(1)} > Student 1 </button>
                <button onClick={() => setvalue(2)} > Student 2 </button>
                <button onClick={() => setvalue(3)} > Student 3 </button>
            </div>{
                value === 1 &&
                (<div>
                    <div className={styles.values} >
                        <h1> Information student 1 </h1>
                        <div className={styles.image} >
                            <Image className={styles.a} src={profilePic} />
                        </div>
                        <div className={styles.b} >
                            <h4> Name: Rorn Menghouy </h4>
                            <h4> Sex: M </h4>
                            <h4> Age: 17 Years Old </h4>
                            <h4> Address: Ampil Village, Krang Yov commune, Saang District, Kandal province. </h4>
                            <h4> Phone: 069361307 </h4>
                            <h4> Email: menghouyrorn @gmail.com </h4>
                            <hr />
                            <h3> EDUCATION </h3>
                            <h4> -Primary(2009 - 2013) Hun Sen Oream Primary school </h4>
                            <h4> -Secondary(2014 - 2017) Samdech techo Hun Sen krong Yov Secondary school </h4>
                            <h4> -Hight School(2018 - 2021) Samdech techo Hun Sen krong Yov Hight school </h4>
                            <h4> -University(2021 - 2022) National University of Management </h4>
                            <h4> -Skills: Information Technology </h4>
                            <h3> COMPUTER AND LANUGE </h3>
                            <h4> -English and khmer </h4>
                            <h4> -I used to study subject of Powerpoint, Exel, Word, Photoshop, HTML, CSS, Java script. </h4>
                            <h4> -And now I 'm studying of Next js.</h4>
                        </div>
                    </div>
                </div>)
            } {
                value === 2 &&
                (<div>
                    <div className={styles.values} >
                        <h1> Information student 1 </h1>
                        <div className={styles.image} >
                            <Image className={styles.a} src={profilePic} />
                        </div>
                        <div className={styles.b} >
                            <h4> Name: ........................ </h4>
                            <h4> Sex: ........ </h4>
                            <h4> Age: ................. </h4>
                            <h4> Address: .............................................................................</h4>
                            <h4> Phone: .....................</h4>
                            <h4> Email: ......................................</h4>
                            <hr />
                            <h3> EDUCATION </h3>
                            <h4> -Primary(2009 - 2013) Hun Sen Oream Primary school </h4>
                            <h4> -Secondary(2014 - 2017) Samdech techo Hun Sen krong Yov Secondary school </h4>
                            <h4> -Hight School(2018 - 2021) Samdech techo Hun Sen krong Yov Hight school </h4>
                            <h4> -University(2021 - 2022) National University of Management </h4>
                            <h4> -Skills: Information Technology </h4>
                            <h3> COMPUTER AND LANUGE </h3>
                            <h4> -English and khmer </h4>
                            <h4> -I used to study subject of Powerpoint, Exel, Word, Photoshop, HTML, CSS, Java script. </h4>
                            <h4> -And now I 'm studying of Next js.</h4>
                        </div>
                    </div>
                </div>)
            } {
                value === 3 &&
                (<div>
                    <div className={styles.values} >
                        <h1> Information student 1 </h1>
                        <div className={styles.image} >
                            <Image className={styles.a} src={profilePic} />
                        </div>
                        <div className={styles.b} >
                            <h4> Name: ........................ </h4>
                            <h4> Sex: ........ </h4>
                            <h4> Age: ................. </h4>
                            <h4> Address: .............................................................................</h4>
                            <h4> Phone: .....................</h4>
                            <h4> Email: ......................................</h4>
                            <hr />
                            <h3> EDUCATION </h3>
                            <h4> -Primary(2009 - 2013) Hun Sen Oream Primary school </h4>
                            <h4> -Secondary(2014 - 2017) Samdech techo Hun Sen krong Yov Secondary school </h4>
                            <h4> -Hight School(2018 - 2021) Samdech techo Hun Sen krong Yov Hight school </h4>
                            <h4> -University(2021 - 2022) National University of Management </h4>
                            <h4> -Skills: Information Technology </h4>
                            <h3> COMPUTER AND LANUGE </h3>
                            <h4> -English and khmer </h4>
                            <h4> -I used to study subject of Powerpoint, Exel, Word, Photoshop, HTML, CSS, Java script. </h4>
                            <h4> -And now I 'm studying of Next js.</h4>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    );
}