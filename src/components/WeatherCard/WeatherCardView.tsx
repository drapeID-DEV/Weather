// components/WeatherCard/WeatherCardView.tsx
import styles from './WeatherCard.module.scss'
import { IWeatherResponse } from '@/shared/types/weatherResponse.type'

interface Props {
	cityName: string
	isLoading: boolean
	tempData: IWeatherResponse | null
	onClick: () => void
	onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void
	onUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void
	onMouseEnter: () => void
	onMouseLeave: () => void
}

export function WeatherCardView({
	cityName,
	isLoading,
	tempData,
	onClick,
	onRemove,
	onUpdate,
	onMouseEnter,
	onMouseLeave
}: Props) {
	return (
		<div
			className={styles.card}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<h2 className={styles.card_header}>{cityName}</h2>

			{isLoading ? (
				<p>Loading...</p>
			) : !tempData ? (
				<p>No temperature data</p>
			) : (
				<>
					<p className={styles.temperature}>
						{Math.round(tempData.current.temp)}°C
					</p>
					<p className={styles.feels_like}>
						Feels like: {Math.round(tempData.current.feels_like)}°C
					</p>
				</>
			)}

			<div className={styles.card_controls}>
				<button
					className={`${styles.control_btn} ${styles.remove_btn}`}
					onClick={onRemove}
				>
					Remove
				</button>
				<button
					className={`${styles.control_btn} ${styles.update_btn}`}
					onClick={onUpdate}
				>
					Update
				</button>
			</div>
		</div>
	)
}
