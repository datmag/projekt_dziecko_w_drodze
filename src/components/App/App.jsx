import React, { Component } from 'react';
import './App.scss';
import * as firebase from 'firebase';
import moment from 'moment';

class App extends Component {

    // componentDidMount() {

        // const title = 'Po 40 tyg. ciąży badanie co 2-3 dni'

        // const text = 'Badanie ogólne podmiotowe i przedmiotowe.Badanie położnicze.Badanie we wzierniku i zestawione - według wskazań medycznych.Ocena ruchów płodu.Ocena czynności serca płodu.Pomiar ciśnienia tętniczego krwi.Pomiar masy ciała.Ocena ryzyka ciążowego.Propagowanie zdrowego stylu życia, w tym zdrowia jamy ustnej.Praktyczne i teoretyczne przygotowanie do porodu, połogu, karmienia piersią i rodzicielstwa w formie grupowej lub indywidualnej.Skierowanie do hospitalizacji po 41 tygodniu ciąży'

        // const text2 = 'Badanie KTG.Badanie ultrasonograficzne (jednorazowo).'

        // const data = {
        //     title: title,
        //     left: text.split('.'),
        //     right: text2.split('.')
        // }

        // firebase.database()
        //     .ref('/texts').push(data)
    // }

    state = {
        texts: [],
        isFetching: true,

        day: '',
        month: '',
        year: '',
        isValid: false,
        currentInfo: 0,
        week: 0
    }

    componentDidMount() {
        firebase.database().ref('/texts').on('value', resp => {
            const data = resp.val();

            const elements = [];

            for(let key in data) {
                elements.push(data[key]);
            }

            this.setState({
                texts: elements,
                isFetching: false,
            })
            
        });
    }

    changeDay = (event) => {
        this.setState({
            day: event.target.value
        });
    }

    changeMonth = (event) => {
        this.setState({
            month: event.target.value
        });
    }

    changeYear = (event) => {
        this.setState({
            year: event.target.value
        });
    }

    sendMessage = (event) => {
        event.preventDefault();


        if (!this.state.day || this.state.day > 31 || this.state.day === 0) {
            this.setState({
                warning: "Nieprawidłowe pole dzień",
                isValid: false
            });
            return;
        }
        if (!this.state.month || this.state.month === 0 || this.state.month > 12) {
            this.setState({
                warning: "Nieprawidłowe pole miesiąc",
                isValid: false
            });
            return;
        }
        if (!this.state.year || this.state.year < 1950 || this.state.year <= 2017) {
            this.setState({
                warning: "Nieprawidłowe pole rok",
                isValid: false
            });
            return;
        }


        console.log('dziala', this.state.day, this.state.month, this.state.year);

        const currentDate = moment();

        const dateFromForm = moment([this.state.year, this.state.month -1, this.state.day]);

        const diffrence = currentDate.diff(dateFromForm, 'weeks');

        console.log(diffrence)

        let infoToDisplay = null;

        if (diffrence < 11) {
            console.log('jestes do 10 tygodnia ciazy')
            infoToDisplay = 0;
        } else if (diffrence >= 11 && diffrence <= 14) {
            console.log('jestes między 11 a 14 tygodniem ciazy')
            infoToDisplay = 1;
        } else if (diffrence >= 15 && diffrence <= 20) {
            console.log('jestes między 15 a 20 tygodniem ciazy')
            infoToDisplay = 2;
        } else if (diffrence >= 21 && diffrence <= 26) {
            console.log('jestes między 21 a 26 tygodniem ciazy')
            infoToDisplay = 3;
        } else if (diffrence >= 27 && diffrence <= 32) {
            console.log('jestes między 27 a 32 tygodniem ciazy')
            infoToDisplay = 4;
        } else if (diffrence >= 33 && diffrence <= 37) {
            console.log('jestes między 33 a 37 tygodniem ciazy')
            infoToDisplay = 5;
        } else if (diffrence >= 38 && diffrence <= 39) {
            console.log('jestes między 38 a 39 tygodniem ciazy')
            infoToDisplay = 6;
        } else {
            console.log('jestes po 40 tygodniu ciazy')
            infoToDisplay = 7;
        }


         this.setState ({
            isValid: true,
            currentInfo: infoToDisplay,
            week: diffrence
            
        });

    }

    render() {

        if(this.state.isFetching) {
            return <h1>Uwaga bo...</h1>
        }

        return (
            <div className="App">
                <div className='mainBackground'>

                    <nav className='page-navbar'>
                        <div className='container'>
                            <h1>DZIECKO W DRODZE!</h1>
                            <ul className="page-navbar-list">
                            <li className="page-navbar-list-item">
                                    <a href="/" className='page-navbar-list-link'>Start</a>
                                </li>
                                <li className="page-navbar-list-item">
                                    <a href="/" className='page-navbar-list-link'>Wybierz tydzień</a>
                                </li>
                                <li className="page-navbar-list-item">
                                    <a href="/" className='page-navbar-list-link'>Chat</a>
                                </li>
                                <li className="page-navbar-list-item">
                                    <a href="/" className='page-navbar-list-link'>Zaloguj się</a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className='container'>
                        <div className='page-search-bar'>
                            <form className='page-search-bar-form'>
                                <h1>Podaj datę ostatniej miesiączki</h1>
                                    <input value={this.state.day} onChange={this.changeDay} type="text" placeholder="Dzień" id='day'/>
                                    <input value={this.state.month} onChange={this.changeMonth} type="text" placeholder="Miesiąc" id='month'/>
                                    <input value={this.state.year} onChange={this.changeYear} type="text" placeholder="Rok" id='year'/>
                                    <input type="submit" value='Potwierdź' onClick={this.sendMessage} id='submit'/>

                                    <p style={{color: "red"}}>{this.state.warning}</p>
                            </form>
                        </div>
                    </div>
                    
                    <div className='page-info-bar'>
                        <div className='container'>
                            <div className='page-info-bar-section'>
                                <h1>Jesteś w {this.state.week} tygodniu</h1>
                                <h2>{this.state.texts[this.state.currentInfo].title}</h2>
                                <div className='lists'>

                                    <div>
                                        <div className='page-info-bar-section-header-list'>
                                        <h2>
                                            Świadczenia profilaktyczne wykonywane przez lekarza lub położną i działania w zakresie promocji zdrowia:
                                        </h2>
                                        </div>           
                                        <ol>
                                            {
                                                // console.log(this.state.texts)

                                                
                                                this.state.texts[this.state.currentInfo].left.map((e,i) => {
                                                    return <li key={i}>{e}</li>
                                                })
                                            }
                                        </ol>
                                    </div>

                                    <div>
                                        <div className='page-info-bar-section-header-list'>
                                        <h2>Badania diagnostyczne i konsultacje medyczne</h2>

                                        </div>
                                            <ol>
                                                {
                                                    this.state.texts[this.state.currentInfo].right.map((e,i) => {
                                                        return <li key={i}>{e}</li>
                                                    })
                                                }
                                            </ol>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
