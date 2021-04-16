import { connect } from 'react-redux'
import Projects from '../components/projects'
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
export default connect(mapStateToProps, mapDispatchToProps)(Projects)