import styles from './Header.module.scss'

import { ParamValue } from 'next/dist/server/request/params'
import Image from 'next/image'
import { CitySelect } from '../CitySelect'
import CustomLink from '../CustomLink'

interface Props {
	isHome: boolean
	city?: ParamValue
}

export function Header({ isHome, city }: Props) {
	return (
		<div className={styles.header}>
			{!isHome ? (
				<>
					<CustomLink path="/">
						<Image
							src="/arrow-left.svg"
							alt="Logo"
							width={50}
							height={50}
							priority
						></Image>
					</CustomLink>
					<h1>{city}</h1>
				</>
			) : (
				<CitySelect />
			)}
			<CustomLink path="/">
				<Image
					src="/cloud.svg"
					alt="Logo"
					width={50}
					height={50}
					priority
				></Image>
			</CustomLink>
		</div>
	)
}
