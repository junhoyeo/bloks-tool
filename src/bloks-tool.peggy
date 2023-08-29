BlokExpression
  = _ "(" _ head:Term _
  		tail:( _ "," _ @Tail )?
    _ ")"
    {
    	return [
        	head,
            ...(tail ?? []),
        ]
    }

Bool = value:("true" / "false") {
	return value === "true";
}

Null = $"null" {
	return null;
}

Number = value: $[0-9]+ {
	return parseFloat(value);
}

DoubleQuote '"'
	= '"'

DoubleQuoteStringCharacter  "String Character"
  = QuoteEscape
  / !('"' / LineTerminator) SourceCharacter { return text(); }

SourceCharacter
	= .

LineTerminator
  = [\n\r\u2028\u2029]

QuoteEscape
  = v:("\\".) { return v[1] === '"' ? '"' : v[0] + v[1]; }

DoubleQuoteString
	= (DoubleQuote contents:$DoubleQuoteStringCharacter* DoubleQuote {
    	return contents
    })

TailPart = BlokExpression / Null / Number / DoubleQuoteString / Bool

Tail = head: TailPart
	tail: (_ "," _ @TailPart _ )*
    {
    	return [head, ...tail];
    }

Term
  = $[a-zA-Z0-9.]+

_ "whitespace"
  = [ \t\n\r]*
