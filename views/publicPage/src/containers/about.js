import { connect } from 'react-redux'
import About from '../components/about'

import { UPDATE_USER } from '../redux/actions'

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        UPDATE_USER: (payload) => dispatch(UPDATE_USER(payload)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(About)