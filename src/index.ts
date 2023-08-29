import {BlokExpression, parse, TailPart} from "./generated/bloks-tool.peggy";

export const parseBloks = parse;

export const IsBlokExpression = (blok: TailPart): blok is BlokExpression => {
    return (Array.isArray(blok)
        && blok.length > 0
        && typeof blok[0] === 'string'
    );
}

export const visitBloks = (node: TailPart, visitor: (blok: BlokExpression) => boolean) => {
    if (IsBlokExpression(node)) {
        if (visitor(node)) {
            return true;
        }

        for (const arg of node.slice(1)) {
            if (visitBloks(arg, visitor)) {
                return true;
            }
        }
    }

    return false;
}
