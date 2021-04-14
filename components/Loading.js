import style from '../styles/Loading.module.scss'

function Loading() {
  return (
	<div className={style.contload}>
		<div className={style.loader}><span className={style.span}></span></div>
	</div>
  )
}

export default Loading
