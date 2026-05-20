export const isSafeString = (val: string): boolean => {
	const patterns = [
		/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC)\b)/gi, // SQL
		/<script[\s\S]*?>|javascript:|on\w+\s*=/gi, // XSS
		/(\$where|\$gt|\$lt|\$ne|\$regex)/gi, // NoSQL
		/(\b(OR|AND|NOT)\b\s*[\w\W]*?=)/gi, // Logical operators
		/(\b(0x[0-9a-f]+|0b[01]+|0o[0-7]+)\b)/gi, // Hex, binary, octal
	]
	return !patterns.some((p) => p.test(val))
}
