import React, { Component } from 'react';
import './PageInfoBar.scss';

class PageInfoBar extends Component {
    render (){

        return (
            <div className='page-info-bar'>
                <div className='container'>
                    <div className='page-info-bar-section'>
                        <h1>Jesteś w {this.props.week} tygodniu</h1>
                        <h2>{this.props.texts[this.props.currentInfo].title}</h2>
                        <div className='lists'>

                            <div className='list-cont'>
                                <div className='page-info-bar-section-header-list'>
                                    <h2>
                                        Świadczenia profilaktyczne wykonywane przez lekarza lub położną i działania w zakresie promocji zdrowia:
                                    </h2>
                                </div>           
                                <ol>
                                    {
                                        this.props.texts[this.props.currentInfo].left.map((e,i) => {
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
                                        this.props.texts[this.props.currentInfo].right.map((e,i) => {
                                            return <li key={i}>{e}</li>
                                        })
                                    }
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
        
    }
}

export default PageInfoBar;