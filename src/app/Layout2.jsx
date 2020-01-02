import React from 'react';

export default class Layout2 extends React.Component {
    render() {
        const styles = {
            header: {
                textAlign: 'center',
                paddingBottom: "10px",
                paddingTop: "10px",
                height: "100px"
            }
        }

        return (
            <div >
                <div className="container" >
                    <img alt="@code42" className="avatar"  style={styles.header} src="https://www.code42.com/wp-content/themes/c42-corporate-wp-theme/dist/images/logo-horizontal.svg"  />
                </div>
            </div>
        );
    }
};

