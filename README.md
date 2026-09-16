## 2026.09.16
### await
```ts
export default async function BlogPage(){
    await new Promise((resolve) => setTimeout(resolve, 3000));//3초 대기
    return()
}
```
### next layout 순서
1. app>layout.tsx
2. marketing>layout.tsx
3. blog&&about>layout.tsx

* **정의**: {children}은 하위 있는 모든 children을 가져온다.

### 비공개 폴더 (Private Folders)
* **정의**: 폴더 이름 앞에 밑줄(`_`)을 붙여 생성합니다. (예: `_folderName`)
* **특징**: 해당 폴더가 **내부 구현 세부 사항**임을 나타내며, 라우팅 시스템에서 완전히 제외됩니다. 하위 폴더 역시 라우팅되지 않습니다.

### 경로 및 URL 매핑 (Path to URL)

| Path | URL | Pattern & Notes |
| :--- | :--- | :--- |
| `app/layout.tsx` | — | 모든 경로를 감싸는 **Root layout** |
| `app/blog/layout.tsx` | — | `/blog` 및 그 하위 경로를 감싸는 레이아웃 |
| `app/page.tsx` | `/` | 공개(Public) 루트 페이지 |
| `app/blog/page.tsx` | `/blog` | 공개(Public) 블로그 메인 페이지 |
| `app/blog/authors/page.tsx` | `/blog/authors` | 공개(Public) 작가 목록 페이지 |

---

##  2026.09.09 | 폴더 및 파일 컨벤션

### 폴더 규칙
* **동적 라우팅 (Dynamic Routes)**: 대괄호(`[segment]`)를 사용하여 세그먼트를 매개변수화(Parameterize)합니다.

### 파일 특수 규칙 (File-Folder Rule)

| File Name | Extension | Role |
| :--- | :--- | :--- |
| **`layout`** | `.js`, `.jsx`, `.tsx` | 상태를 유지하고 리렌더링을 방지하는 레이아웃 UI |
| **`page`** | `.js`, `.jsx`, `.tsx` | 경로의 고유한 UI를 나타내는 페이지 |
| **`loading`** | `.js`, `.jsx`, `.tsx` | 데이터 로딩 중에 표시되는 UI (Skeletons 구조 활용) |
| **`not-found`** | `.js`, `.jsx`, `.tsx` | 404 Not Found UI |
| **`error`** | `.js`, `.jsx`, `.tsx` | 해당 세그먼트와 하위 세그먼트의 에러 핸들링 UI |
| **`global-error`** | `.js`, `.jsx`, `.tsx` | 전역(Root) 에러 핸들링 UI |
| **`route`** | `.js`, `.ts` | API 엔드포인트 생성 |
| **`template`** | `.js`, `.jsx`, `.tsx` | 새 네비게이션 시 항상 다시 렌더링되는 레이아웃 |
| **`default`** | `.js`, `.jsx`, `.tsx` | 병렬 라우트(Parallel Routes)의 폴백 페이지 |

> **Skeletons 이란?**
> 사용자가 페이지 로딩을 인지하고 기대할 수 있도록 미리보기 형태로 보여주는 로딩 UI입니다. (예: 뉴스 홈 화면에서 실제 콘텐츠가 채워지기 전, 규격에 맞춰 빈 칸이나 회색 박스를 띄워두는 방식)


- tsconfig.json
```ts
    "paths":{
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"]
    }
    //baseUrl의 경우 "ignoreDeprecations": "6.0"이 없으면 빨간줄. 오류가 생기는건 아니나 추후 삭제될 코드
    "ignoreDeprecations": "6.0",
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
```
## gitignore 정보 확인용
- https://www.toptal.com/developers/gitignore/
