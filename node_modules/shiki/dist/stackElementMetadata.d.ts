/**
 * Helpers to manage the "collapsed" metadata of an entire StackElement stack.
 * The following assumptions have been made:
 *  - languageId < 256 => needs 8 bits
 *  - unique color count < 512 => needs 9 bits
 *
 * The binary format is:
 * - -------------------------------------------
 *     3322 2222 2222 1111 1111 1100 0000 0000
 *     1098 7654 3210 9876 5432 1098 7654 3210
 * - -------------------------------------------
 *     xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx
 *     bbbb bbbb bfff ffff ffFF FTTT LLLL LLLL
 * - -------------------------------------------
 *  - L = LanguageId (8 bits)
 *  - T = StandardTokenType (3 bits)
 *  - F = FontStyle (3 bits)
 *  - f = foreground color (9 bits)
 *  - b = background color (9 bits)
 */
export declare const enum MetadataConsts {
    LANGUAGEID_MASK = 255,
    TOKEN_TYPE_MASK = 1792,
    FONT_STYLE_MASK = 14336,
    FOREGROUND_MASK = 8372224,
    BACKGROUND_MASK = 4286578688,
    LANGUAGEID_OFFSET = 0,
    TOKEN_TYPE_OFFSET = 8,
    FONT_STYLE_OFFSET = 11,
    FOREGROUND_OFFSET = 14,
    BACKGROUND_OFFSET = 23
}
export declare const enum TemporaryStandardTokenType {
    Other = 0,
    Comment = 1,
    String = 2,
    RegEx = 4,
    MetaEmbedded = 8
}
export declare const enum FontStyle {
    NotSet = -1,
    None = 0,
    Italic = 1,
    Bold = 2,
    Underline = 4
}
export declare const enum StandardTokenType {
    Other = 0,
    Comment = 1,
    String = 2,
    RegEx = 4
}
export declare class StackElementMetadata {
    static toBinaryStr(metadata: number): string;
    static printMetadata(metadata: number): void;
    static getLanguageId(metadata: number): number;
    static getTokenType(metadata: number): number;
    static getFontStyle(metadata: number): number;
    static getForeground(metadata: number): number;
    static getBackground(metadata: number): number;
    static set(metadata: number, languageId: number, tokenType: TemporaryStandardTokenType, fontStyle: FontStyle, foreground: number, background: number): number;
}
