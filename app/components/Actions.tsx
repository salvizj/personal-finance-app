import Button from "~/components/ui/Button"
import type { Action } from "~/types/types"

type ActionsProps = {
	actions: Action[]
}

const Actions = ({ actions }: ActionsProps) => {
	return (
		<div className="flex gap-2">
			{actions.map((action) => (
				<Button
					key={action.label}
					variant={action.variant}
					onClick={action.onClick}
				>
					{action.label}
				</Button>
			))}
		</div>
	)
}

export default Actions
