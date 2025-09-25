export const modalStyle = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
}

export const closeButtonStyle = (theme) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  color: theme.palette.grey[500],
})

export const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 1,
  mt: 4,
}
