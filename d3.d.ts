declare module 'd3-hierarchy' {
  export function treemap<Datum>(): TreemapLayout<Datum>;
  export function hierarchy<Datum>(data: Datum): HierarchyNode<Datum>;
  
  export interface HierarchyNode<Datum> {
    data: Datum;
    depth: number;
    height: number;
    parent: HierarchyNode<Datum> | null;
    children?: HierarchyNode<Datum>[];
    value?: number;
    x0?: number;
    y0?: number;
    x1?: number;
    y1?: number;
  }

  export interface TreemapLayout<Datum> {
    (root: HierarchyNode<Datum>): HierarchyNode<Datum>;
    size(): [number, number];
    size(size: [number, number]): this;
    round(): boolean;
    round(round: boolean): this;
    padding(): number;
    padding(padding: number): this;
  }
}

declare module 'd3-selection' {
  export function select(selector: string | Element): Selection<Element, unknown, null, undefined>;

  export interface Selection<GElement extends Element, Datum, PElement extends Element | null, PDatum> {
    selectAll(selector: string): Selection<Element, Datum, PElement, PDatum>;
    data<NewDatum>(data: NewDatum[]): Selection<GElement, NewDatum, PElement, PDatum>;
    join<NewElement extends Element>(
      enter: (enter: Selection<null, NewDatum, PElement, PDatum>) => Selection<NewElement, NewDatum, PElement, PDatum>
    ): Selection<NewElement | GElement, NewDatum, PElement, PDatum>;
    attr(name: string, value: string | number | boolean | null): this;
    attr(name: string, value: (d: Datum, i: number, nodes: GElement[]) => string | number | boolean | null): this;
    append<ChildElement extends Element>(type: string): Selection<ChildElement, Datum, GElement, Datum>;
    text(value: (d: Datum, i: number, nodes: GElement[]) => string): this;
    node(): GElement | null;
    remove(): this;  // Añadimos el método remove aquí
  }
}

declare module 'd3-scale' {
  export function scaleOrdinal<Range>(range: Range[]): ScaleOrdinal<string, Range>;

  export interface ScaleOrdinal<Domain extends { toString(): string }, Range> {
    (value: Domain): Range;
    domain(): Domain[];
    domain(domain: Domain[]): this;
    range(): Range[];
    range(range: Range[]): this;
  }
}

declare module 'd3-scale-chromatic' {
  export const schemePurples: ReadonlyArray<ReadonlyArray<string>>;
}

