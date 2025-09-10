'use client'

import { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/material'

interface SyntaxHighlighterProps {
  code: string
  language: string
}

const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({ code, language }) => {
  const theme = useTheme()
  const [highlighted, setHighlighted] = useState(code)
  
  // Simple syntax highlighting for JavaScript
  useEffect(() => {
    if (language === 'javascript') {
      // This is a very simple implementation - a real app would use a proper library
      const highlighted = code
        // Keywords
        .replace(
          /\b(const|let|var|function|return|if|else|async|await|try|catch|for|while|import|export|from|class|extends|new|this)\b/g,
          '<span style="color: #c792ea;">$1</span>'
        )
        // Strings
        .replace(
          /(['"])(.*?)\1/g,
          '<span style="color: #c3e88d;">$1$2$1</span>'
        )
        // Comments
        .replace(
          /(\/\/.*)/g,
          '<span style="color: #676e95;">$1</span>'
        )
        // Function calls
        .replace(
          /(\w+)(?=\s*\()/g,
          '<span style="color: #82aaff;">$1</span>'
        )
        // Numbers
        .replace(
          /\b(\d+)\b/g,
          '<span style="color: #f78c6c;">$1</span>'
        )
        // Objects and properties
        .replace(
          /\.(\w+)/g,
          '.<span style="color: #ffcb6b;">$1</span>'
        )
      
      setHighlighted(highlighted)
    } else {
      setHighlighted(code)
    }
  }, [code, language])

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
        padding: 2,
        borderRadius: 1,
        overflow: 'auto',
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        fontSize: '0.875rem',
        lineHeight: 1.5,
        '& pre': {
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }
      }}
    >
      <pre dangerouslySetInnerHTML={{ __html: highlighted }} />
    </Box>
  )
}

export default SyntaxHighlighter
