import PropTypes from 'prop-types';

const dogShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  dogName: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  dogImageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

export default { dogShape };
