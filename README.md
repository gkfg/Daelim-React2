# 2026.09.09
- folder and file conventions
● 대괄호를 사용해 세그먼트 매개변수화

- file folder rule

|layout|.js .jsx .tsx|Layout|
|page|.js .jsx .tsx|Page|
|loding|.js .jsx .tsx|Loading UI|
|not-found|.js .jsx .tsx|Not found UI|
|error|.js .jsx .tsx|Error UI|
|global-error|.js .jsx .tsx|Global error UI|
|route|.js .ts|API endpoint|
|templete|.js .jsx .tsx|Re-rendered layout|
|default|.js .jsx .tsx|Parallel route fallback page|

skeletons(페이지를 기대할 수 있게 미리보기 로딩형식. 예시: 뉴스 홈 화면에 규격에 맞춰 빈 칸을 만드는 등)


- tsconfig.json
```ts
    "paths":{
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"]
    }
    //baseUrl의 경우 "ignoreDeprecations": "6.0",가 없으면 빨간줄. 오류가 생기는건 아니나 추후 삭제될 코드
    "ignoreDeprecations": "6.0",
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
```
## gitignore 정보 확인용
- https://www.toptal.com/developers/gitignore/
