'use client'

import { useEffect, useState } from 'react'
import styles from './CursorDot.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function CursorDot() {
	const cursorOffset = -15
	const size = useSelector((state: RootState) => state.cursor.size)
	const color = useSelector((state: RootState) => state.cursor.color)
	const [mounted, setMounted] = useState(false)
	const [pos, setPos] = useState({ x: 0, y: 0 })

	useEffect(() => {
		setMounted(true)

		const move = (e: MouseEvent) => {
			setPos({ x: e.clientX + cursorOffset, y: e.clientY + cursorOffset })
		}

		window.addEventListener('mousemove', move)
		return () => window.removeEventListener('mousemove', move)
	}, [])

	if (!mounted) return null

	return (
		<div
			className={styles.cursor}
			style={{
				transform: `translate(${pos.x}px, ${pos.y}px)`,
				backgroundColor: color,
				width: size.width,
				height: size.height
			}}
		></div>
	)
}
