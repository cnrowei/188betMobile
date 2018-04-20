package helper

import (
	"encoding/base64"

	"github.com/flosch/pongo2"
)

func ConvertToBase64ByPongo2(in *pongo2.Value) *pongo2.Value {
	return pongo2.AsValue(base64.StdEncoding.EncodeToString([]byte(in.String())))
}

func VideoTagsByPongo2(in *pongo2.Value) *pongo2.Value {
	return pongo2.AsValue(VideoTags(in.String()))
}

func SplitByPongo2(in *pongo2.Value, splitor *pongo2.Value) *pongo2.Value {
	return pongo2.AsValue(Split(in.String(), splitor.String()))
}

func MarkdownByPongo2(in *pongo2.Value) *pongo2.Value {
	return pongo2.AsValue(Markdown(in.String()))
}

func CropwordByPongo2(in *pongo2.Value, start *pongo2.Value, length *pongo2.Value, symbol *pongo2.Value) *pongo2.Value {
	return pongo2.AsValue(Substr(in.String(), start.Integer(), length.Integer(), symbol.String()))
}
