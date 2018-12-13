import React, { Component } from 'react';
import './App.scss';
import * as firebase from 'firebase';
import moment from 'moment';

class App extends Component {
    state = {
        texts: [],
        isFetching: true,

        day: '',
        month: '',
        year: '2018',
        isValid: false,
        currentInfo: 0,
        week: 0,

        lists: false,
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

        // console.log(this.state.day, this.state.month, this.state.year)
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
        if (!this.state.year || this.state.year <= 2017 || this.state.year > 2018) {
            this.setState({
                warning: "Nieprawidłowe pole rok",
                isValid: false
            });
            return;
        }

        // console.log('dziala', this.state.day, this.state.month, this.state.year);
        const currentDate = moment();

        const dateFromForm = moment([this.state.year, this.state.month -1, this.state.day]);

        const diffrence = currentDate.diff(dateFromForm, 'weeks');

        // blokada NaN, jeśli this.state.day przekracza ilość dni w danym miesiącu
        if (isNaN(diffrence)) {
            this.setState({
                warning: "Nieprawidłowy dzień",
                isValid: false
            });
            return;
        }

        if (diffrence < 0) {
            this.setState({
                warning: "Jeszcze nie możesz być w ciąży :)",
                isValid: false
            });
            return;
        }

        // console.log(diffrence)
        let infoToDisplay = null;

        if (diffrence < 11) {
            infoToDisplay = 0;
        } else if (diffrence >= 11 && diffrence <= 14) {
            infoToDisplay = 1;
        } else if (diffrence >= 15 && diffrence <= 20) {
            infoToDisplay = 2;
        } else if (diffrence >= 21 && diffrence <= 26) {
            infoToDisplay = 3;
        } else if (diffrence >= 27 && diffrence <= 32) {
            infoToDisplay = 4;
        } else if (diffrence >= 33 && diffrence <= 37) {
            infoToDisplay = 5;
        } else if (diffrence >= 38 && diffrence <= 39) {
            infoToDisplay = 6;
        } else {
            infoToDisplay = 7;
        }

         this.setState ({
            isValid: true,
            currentInfo: infoToDisplay,
            week: diffrence,
            day: '',
            month: '', 
            year: '2018',
            warning: ''
        });
    }

    render() {
        
        if(this.state.isFetching) {
            return <h1 style={{
                textAlign: 'center'
            }}>Uwaga bo...</h1>
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
                                {/* <li className="page-navbar-list-item">
                                    <a href="/" className='page-navbar-list-link'>Wybierz tydzień</a>
                                </li> */}
                                {/* <li className="page-navbar-list-item">
                                    <a href="/" className='page-navbar-list-link'>Chat</a>
                                </li> */}
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

                                    <div className='list-cont'>
                                        <div className='page-info-bar-section-header-list'>
                                        <h2>
                                            Świadczenia profilaktyczne wykonywane przez lekarza lub położną i działania w zakresie promocji zdrowia:
                                        </h2>
                                        </div>           
                                        <ol>
                                            {
                                                this.state.texts[this.state.currentInfo].left.map((e,i) => {
                                                    return <li key={i}>{e}</li>
                                                })
                                            }
                                        </ol>
                                    </div>

                                    <div className='list-cont'>
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