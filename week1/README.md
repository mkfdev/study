# 1회차
1. 1_js_dom keypoint
2. 2_jqeury_dom keypoint
3. 과제
4. 공부 후 헷갈리는 것 정리

## 1) Javascript DOM keypoint

### __노드 접근__
----------
+ childNodes
+ parentNode
+ previousSibling
	+ IE8이하에서 잘 적용됨
	+ IE9이상/최신 브라우저에서는 previousSibling을 두번 적어준다.
		+ ex) node.previousSibling.previousSibling.style.border
+ nextSibling (IE8이하에서 잘 적용됨)
+ firstChild
+ firstElementChild
+ nodeValue
	+ 요소안의 텍스트 수정할 때 사용
+ item(index)
+ createElement('요소')
+ createTextNode('텍스트')
	+ ex) document.createTextNode('텍스트 노드 생성')
+ element.appendChild(다른 요소 또는 텍스트)
	+ 요소 영역의 가장 뒤에 넣는다.
	+ 기존 요소의 이동도 가능하다.
+ element.insertBefore(요소, 기준위치)
	+ 요소 영역의 가장 앞에 넣는다.
+ element.innerHTML
+ element.cloneNode(true)
	+ element 그대로 복사
+ element.removeChild(삭제할 요소)


### __nodeType 속성__
+ 사용법 node.nodeType
+ 숫자로 type을 판별


| node type  |  value |
|---|---|
| ELEMENT NODE | 1 |
| TEXT NODE  | 3 |
| ATTRIBUTE NOME  | 2  |


### style 접근과 제거
----------
- node.__style__.color 
	- 인라인 스타일일 경우
- __window__.__getComputedStyle__(node, null)
	- 스타일 속성이 인라인 스타일이 아닌 경우, 함수로 접근
	- var style = window.getComputedStyle(node,null);
	- style.fontSize
- __IE__ : window.__currentStyle__ 
- node.style.__removeProperty__("border")


### attribute 제어
---
- node.__getAttribute__("attribute")
- node.__setAttribute__("attribute","value")
- node.__attributes.removeNamedItem__("data-value");	


## 2) jQuery DOM keyPoint

### __노드 접근__
---
- $("body").__contents()__
	- 텍스트 노드를 포함한 모든 자식 노드를 찾을 때
- $("body").__children()__
	- 태그 노드만 찾을 때
- selector.append("추가내용") 
- selector.text("텍스트 변경")
- selector.css("속성","값 변경")


### style 제거
---
- selector__[0].style.removeProperty("border")__


### attribute 제어
- get/set selector.attr("어트리뷰트", "set할 값")
- 제거 selector.removeAttr("제거할 어트리뷰트");